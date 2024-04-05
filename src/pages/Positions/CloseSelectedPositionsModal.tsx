import {useEffect, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {BigNumberish, BigNumber} from 'ethers'
import {colors, TEXT} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import {useUnwindCallback} from '../../hooks/useUnwindCallback'
import {useCurrentWalletPositionsV2} from '../../state/build/hooks'
import {useUnwindState, useUnwindActionHandlers, useDerivedUnwindInfo} from '../../state/unwind/hooks'
import {formatWeiToParsedNumber} from '../../utils/formatWei'
import {FlexRow} from '../../components/Container/Container'
import {TriggerActionButton} from '../../components/Button/Button'
import {useMarketListPrices, useMarketPrice} from '../../hooks/useMarketPrices'
import {useMultiplePositionsMulticall} from '../../hooks/useMultiplePositionsMulticall'

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 10px;
  z-index: 100;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(32, 36, 49, 0.5) !important;
`

const MessageBox = styled.div`
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${colors(true).dark.grey4};
`
const UnwindButton = styled(TriggerActionButton)`
  margin: 24px 0;
  border: 1px solid #f2f2f2;
  padding: 10px;
`
const CancelButton = styled(TriggerActionButton)`
  color: ${colors(true).dark.red};
  border: 1px solid ${colors(true).dark.red};
  width: 100px;
  padding: 10px;
  margin-right: 10px;
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

export function CloseSelectedPositionsModal({onClose, selectedPositionsList}: ModalProps) {
  const marketPositionId = '0x3a204d03e9b1fee01b8989333665b6c46cc1f79e-0x1d02f'
  const positionId = '0x1d02f'
  const {account, chainId} = useActiveWeb3React()
  const {positions, isUninitialized, refetch} = useCurrentWalletPositionsV2(account)

  useEffect(() => {
    !isUninitialized && refetch()
  }, [chainId, isUninitialized, refetch])

  const {typedValue} = useUnwindState()

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

  const position = filtered ? filtered[0] : null
  const callMethods = ['value', 'liquidationPrice']
  const multicallResults: MulticallResults = useMultiplePositionsMulticall(selPositionsIds, callMethods)
  console.log(multicallResults)

  // const {value, cost, info: positionInfo, oiCurrent: oi, liquidationPrice: liquidationPriceResult} = multicallRes

  // const isLong = positionInfo ? positionInfo.isLong : undefined

  const marketList: string[] = useMemo(() => {
    let tempSet = new Set<string>()
    selectedPositionsList.forEach(id => {
      tempSet.add(id.slice(0, 42))
    })
    return Array.from(tempSet)
  }, [selectedPositionsList])

  const fetchPrices1 = useMarketListPrices(marketList)
  console.log(fetchPrices1)
  const fetchPrices = useMarketPrice(position?.market.id)

  const prices: {
    bid?: string | number | any
    ask?: string | number | any
    mid?: string | number | any
    _bid?: BigNumberish
    _ask?: BigNumberish
    _mid?: BigNumberish
  } = useMemo(() => {
    if (fetchPrices === undefined || !fetchPrices)
      return {
        bid: 'loading',
        ask: 'loading',
        mid: 'loading',
        _bid: undefined,
        _ask: undefined,
        _mid: undefined,
      }

    return {
      bid: formatWeiToParsedNumber(fetchPrices[0], 18, 2)?.toString(),
      ask: formatWeiToParsedNumber(fetchPrices[1], 18, 2)?.toString(),
      mid: formatWeiToParsedNumber(fetchPrices[2], 18, 2)?.toString(),
      _bid: fetchPrices.bid_,
      _ask: fetchPrices.ask_,
      _mid: fetchPrices.mid_,
    }
  }, [fetchPrices])

  const {unwindData} = useDerivedUnwindInfo()
  // const {callback: unwindCallback} = useUnwindCallback(unwindData, position?.market.id, typedValue, value, positionId, isLong, prices)
  useEffect(() => {
    onResetUnwindState()
  }, [positionId, onResetUnwindState])

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
  }, [onResetUnwindState])

  const handleClose = () => {
    onClose(false)
  }

  return (
    <PageWrapper>
      <MessageBox>
        {areMarketsShutDown ? (
          <>
            <TEXT.BoldHeader1 fontSize={16} color={'white'}>
              Sorry for not being able to close all selected positions at the moment. Some positions can't be closed at the time.
            </TEXT.BoldHeader1>
            <FlexRow justify={'end'}>
              <CancelButton onClick={handleClose}>OK</CancelButton>
            </FlexRow>
          </>
        ) : (
          <>
            <TEXT.BoldHeader1 color={'white'}>You are going to close {selectedPositionsList.length} selected positions</TEXT.BoldHeader1>
            <FlexRow>
              <CancelButton onClick={handleClose}>Cancel</CancelButton>
              <UnwindButton onClick={handleUnwind}>Close selected positions</UnwindButton>
            </FlexRow>
          </>
        )}
      </MessageBox>
    </PageWrapper>
  )
}
