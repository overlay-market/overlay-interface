import {useEffect, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {BigNumberish, BigNumber} from 'ethers'
import {colors, TEXT} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import {useMultipleUnwindsCallback, useUnwindCallback} from '../../hooks/useUnwindCallback'
import {useCurrentWalletPositionsV2} from '../../state/build/hooks'
import {useUnwindState, useUnwindActionHandlers, useDerivedUnwindInfo} from '../../state/unwind/hooks'
import {formatWeiToParsedNumber} from '../../utils/formatWei'
import {FlexRow, FlexContainer} from '../../components/Container/Container'
import {ColorButton} from '../../components/Button/Button'
import {useMarketListPrices} from '../../hooks/useMarketPrices'
import {useMultiplePositionsMulticall} from '../../hooks/useMultiplePositionsMulticall'

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(32, 36, 49, 0.4) !important;
  backdrop-filter: blur(8px);
`

const MessageBox = styled(FlexContainer)`
  width: 385px;
  flex-direction: column;
  align-items: start;
  gap: 21px;
  padding: 24px;
  background: #171926;
  border-radius: 8px;
`
const CloseButton = styled.div`
  position: absolute;
  top: 0px;
  right: 8px;
  font-size: 32px;
  font-weight: 200;
  color: #f0f0f0;
  cursor: pointer;
`

interface ModalProps {
  onClose: Function
  selectedPositionsList: string[]
}

type selPositionsIds = {
  [id: string]: {
    marketPositionId: string
    positionId: string
  }
}

interface MulticallResults {
  [marketPositionId: string]: {
    [callMethod: string]: BigNumber | undefined
  }
}

type marketListPrices = {
  [marketAddress: string]: {
    bid?: string | number | any
    ask?: string | number | any
    mid?: string | number | any
    _bid?: BigNumberish
    _ask?: BigNumberish
    _mid?: BigNumberish
  }
}

type unwindDataType = {
  [id: string]: {
    unwindData: any
    marketAddress: string | undefined
    unwindValue: string
    positionCurrentValue: BigNumber | undefined
    positionId: string | null
    isLong: boolean | undefined
    prices: any | undefined
  }
}

export function CloseSelectedPositionsModal({onClose, selectedPositionsList}: ModalProps) {
  const marketPositionId = '0x3a204d03e9b1fee01b8989333665b6c46cc1f79e-0x1d02f'
  const positionId = '0x1d02f'
  const {account, chainId} = useActiveWeb3React()
  const {positions, isUninitialized, refetch} = useCurrentWalletPositionsV2(account)

  useEffect(() => {
    !isUninitialized && refetch()
  }, [chainId, isUninitialized, refetch])

  // const {typedValue} = useUnwindState()

  const {onResetUnwindState} = useUnwindActionHandlers()
  const filtered = positions?.filter((index, key) => selectedPositionsList.includes(index.id))

  const selPositions = filtered ? filtered : null

  const areMarketsShutDown = selPositions?.some(position => position?.market.isShutdown)

  let selPositionsIds: selPositionsIds = {}
  selPositions &&
    selPositions.forEach(position => {
      selPositionsIds[position.id] = {
        marketPositionId: position.market.id,
        positionId: position.positionId,
      }
    })
  // console.log(selPositionsIds, ' - -- selPositionsId')
  const position = filtered ? filtered[0] : null
  const callMethods = ['value', 'liquidationPrice']
  const multicallResults: MulticallResults = useMultiplePositionsMulticall(selPositionsIds, callMethods)
  // console.log(multicallResults, ' - - -multicall results')

  // const {value, cost, info: positionInfo, oiCurrent: oi, liquidationPrice: liquidationPriceResult} = multicallRes

  // const isLong = positionInfo ? positionInfo.isLong : undefined

  const marketList: string[] = useMemo(() => {
    let tempSet = new Set<string>()
    selectedPositionsList.forEach(id => {
      tempSet.add(id.slice(0, 42))
    })
    return Array.from(tempSet)
  }, [selectedPositionsList])

  const fetchPrices = useMarketListPrices(marketList)

  const prices: marketListPrices = useMemo(() => {
    let marketsPrices: marketListPrices = {}
    const arePricesUndefined = Object.keys(fetchPrices).reduce((ac, id) => ac || fetchPrices[id] === undefined, false)

    if (arePricesUndefined) {
      Object.keys(fetchPrices).forEach((id: string) => {
        marketsPrices[id] = {
          bid: 'loading',
          ask: 'loading',
          mid: 'loading',
          _bid: undefined,
          _ask: undefined,
          _mid: undefined,
        }
      })
      return marketsPrices
    }

    Object.keys(fetchPrices).forEach((id: string) => {
      marketsPrices[id] = {
        bid: formatWeiToParsedNumber(fetchPrices[id][0], 18, 2)?.toString(),
        ask: formatWeiToParsedNumber(fetchPrices[id][1], 18, 2)?.toString(),
        mid: formatWeiToParsedNumber(fetchPrices[id][2], 18, 2)?.toString(),
        _bid: fetchPrices[id].bid_,
        _ask: fetchPrices[id].ask_,
        _mid: fetchPrices[id].mid_,
      }
    })
    return marketsPrices
  }, [fetchPrices])

  let positionsUnderwaterList: any[] = []

  selPositions &&
    multicallResults &&
    prices &&
    Object.keys(multicallResults).forEach((id: string) => {
      positionsUnderwaterList.push(
        selPositions.find(pos => pos.id === id)!.isLong
          ? multicallResults[id]['liquidationPrice']?.gt(prices[id.slice(0, 42)]._mid!)
          : multicallResults[id]['liquidationPrice']?.lt(prices[id.slice(0, 42)]._mid!),
      )
    })

  const arePositionsUnderwater =
    multicallResults && prices ? positionsUnderwaterList.reduce((acc, booleanValue) => acc || booleanValue, false) : false

  const {unwindData} = useDerivedUnwindInfo()

  const unwindDataList: unwindDataType = {}
  // console.log(prices, '- - -prices')
  // console.log(selPositions, ' - - - selPositions')

  selPositions &&
    multicallResults &&
    prices &&
    selPositions.forEach(position => {
      unwindDataList[position.id] = {
        unwindData: unwindData,
        marketAddress: position.market.id,
        unwindValue: '100',
        positionCurrentValue: multicallResults[position.id]['value'],
        positionId: position.positionId,
        isLong: position.isLong,
        prices: prices[position.market.id],
      }
    })

  const {callback: unwindCallback} = useMultipleUnwindsCallback(unwindDataList)
  // console.log(prices, '- - -prices')
  console.log(unwindDataList, ' - -- -unwindDataList')

  const marketAddressList: (string | undefined)[] = useMemo(() => {
    let tempSet = new Set<string | undefined>()
    Object.keys(unwindDataList).forEach(id => {
      tempSet.add(unwindDataList[id]['marketAddress'])
    })
    return Array.from(tempSet)
  }, [unwindDataList])

  // console.log(marketAddressList.reduce((ac, el) => ac || el === undefined, false))

  // console.log(marketAddressList, ' + + + +marketAddressList')

  // const handleUnwind = useCallback(() => {
  //   if (!unwindCallback) return
  //   unwindCallback()
  //     .then(success => {
  //       onResetUnwindState()
  //     })
  //     .catch(err => console.error('Error from handleUnwind: ', err))
  // }, [unwindCallback, onResetUnwindState])

  const handleUnwind = useCallback(() => {
    console.log('UUUUUNNNNWWWWIIINNNDD')
    if (!unwindCallback) return
    unwindCallback().then((success: any) => {
      console.log(success, ' + + + + succceeessss')
    })
  }, [onResetUnwindState])

  const handleClose = () => {
    onClose(false)
  }

  return (
    <PageWrapper>
      <MessageBox>
        <CloseButton onClick={handleClose}>&times;</CloseButton>

        {areMarketsShutDown || arePositionsUnderwater ? (
          <>
            <TEXT.BoldHeader1 fontSize={14} color={'#f2f2f2'}>
              Sorry for not being able to close all selected positions at the moment. Some positions can't be closed at the time.
            </TEXT.BoldHeader1>
            <FlexRow justify={'end'}>
              <ColorButton color={'#e5f6ff'} bgColor={'#353b4f'} width={'100%'} onClick={handleClose}>
                OK
              </ColorButton>
            </FlexRow>
          </>
        ) : (
          <>
            <TEXT.BoldHeader1 fontSize={18} color={'#f2f2f2'}>
              You're about you unwind {selectedPositionsList.length} positions
            </TEXT.BoldHeader1>
            <TEXT.SmallBody color={colors(false).dark.grey2}>
              {selectedPositionsList.length} transactions approvals will be triggered in Metamask, one after the other.
            </TEXT.SmallBody>
            <FlexRow gap={'8px'}>
              <ColorButton color={'#e5f6ff'} bgColor={'#353b4f'} width={'100%'} onClick={handleClose}>
                Cancel
              </ColorButton>
              <ColorButton width={'100%'} onClick={handleUnwind}>
                Close positions
              </ColorButton>
            </FlexRow>
          </>
        )}
      </MessageBox>
    </PageWrapper>
  )
}
