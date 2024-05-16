import {useEffect, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {BigNumberish, BigNumber} from 'ethers'
import {colors, TEXT} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import {useMultipleUnwindsCallback, UnwindDataType} from '../../hooks/useUnwindCallback'
import {usePositionList} from '../../state/build/hooks'
import {useUnwindActionHandlers, useDerivedUnwindInfo} from '../../state/unwind/hooks'
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
  onCloseCheckboxes: Function
}

type SelPositionsIds = {
  [id: string]: {
    marketPositionId: string
    positionId: string
  }
}

type MarketListPrices = {
  [marketAddress: string]: {
    bid?: string | number | any
    ask?: string | number | any
    mid?: string | number | any
    _bid?: BigNumberish
    _ask?: BigNumberish
    _mid?: BigNumberish
  }
}

export function CloseSelectedPositionsModal({onClose, selectedPositionsList, onCloseCheckboxes}: ModalProps) {
  const {account, chainId} = useActiveWeb3React()

  const {positions: selPositions, isUninitialized, refetch} = usePositionList(account, selectedPositionsList)

  useEffect(() => {
    !isUninitialized && refetch()
  }, [chainId, isUninitialized, refetch])

  const {onResetUnwindState} = useUnwindActionHandlers()

  let selPositionsIds: SelPositionsIds = {}
  selPositions &&
    selPositions.forEach(position => {
      selPositionsIds[position.id] = {
        marketPositionId: position.market.id,
        positionId: position.positionId,
      }
    })

  const callMethods = ['value', 'liquidationPrice']
  const multicallResults = useMultiplePositionsMulticall(selPositionsIds, callMethods)

  const marketList: string[] = useMemo(() => {
    let tempSet = new Set<string>()
    selectedPositionsList.forEach(id => {
      tempSet.add(id.slice(0, 42))
    })
    return Array.from(tempSet)
  }, [selectedPositionsList])

  const fetchPrices = useMarketListPrices(marketList)
  const arePricesUndefined = Object.keys(fetchPrices).reduce((ac, id) => ac || fetchPrices[id] === undefined, false)

  const prices: MarketListPrices = useMemo(() => {
    let marketsPrices: MarketListPrices = {}

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
        bid: formatWeiToParsedNumber(fetchPrices[id]['bid'], 18, 2)?.toString(),
        ask: formatWeiToParsedNumber(fetchPrices[id]['ask'], 18, 2)?.toString(),
        mid: formatWeiToParsedNumber(fetchPrices[id]['mid'], 18, 2)?.toString(),
        _bid: fetchPrices[id]['_bid'],
        _ask: fetchPrices[id]['_ask'],
        _mid: fetchPrices[id]['_mid'],
      }
    })
    return marketsPrices
  }, [fetchPrices])

  const {unwindData} = useDerivedUnwindInfo()

  const unwindDataList: UnwindDataType = {}

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

  const handleUnwind = useCallback(() => {
    onClose(false)
    if (!unwindCallback) return
    unwindCallback()
      .then(() => {
        onCloseCheckboxes(false)
        onResetUnwindState()
      })
      .catch(err => console.error('Error from handleUnwind: ', err))
  }, [unwindCallback, onResetUnwindState])

  const handleClose = () => {
    onClose(false)
  }

  return (
    <PageWrapper>
      <MessageBox>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <TEXT.BoldHeader1 fontSize={18} color={'#f2f2f2'}>
          You're about to unwind {selectedPositionsList.length} positions
        </TEXT.BoldHeader1>
        <TEXT.SmallBody color={colors(false).dark.grey2}>
          {selectedPositionsList.length} approvals will be triggered in your wallet, one after another.
        </TEXT.SmallBody>
        <FlexRow gap={'8px'}>
          <ColorButton color={'#e5f6ff'} bgColor={'#353b4f'} width={'100%'} onClick={handleClose}>
            Cancel
          </ColorButton>
          <ColorButton width={'100%'} onClick={handleUnwind}>
            Close positions
          </ColorButton>
        </FlexRow>
      </MessageBox>
    </PageWrapper>
  )
}
