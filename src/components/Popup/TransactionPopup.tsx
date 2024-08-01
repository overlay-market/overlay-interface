import {AlertTriangle, CheckCircle} from 'react-feather'
import styled from 'styled-components'
import {ExternalLink as ExternalLinkIcon} from 'react-feather'
import {Icon} from '../Icon/Icon'
import {TEXT} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import {getExplorerLink, ExplorerDataType} from '../../utils/getExplorerLink'
import {TransactionType} from '../../state/transactions/actions'
import {ExternalLink} from '../../components/ExternalLink/ExternalLink'
import {FlexRow, FlexColumn} from '../Container/Container'

const PopupContentsContainer = styled(FlexRow)`
  z-index: 420;
`

const ExternalLinkContentsContainer = styled(FlexRow)`
  margin-top: 4px;
`

const PopupTextContainer = styled(FlexColumn)`
  align-items: start;
  margin: 0 16px 0 12px;
`

const IconContainer = styled(Icon)`
  margin: 1px 3px 0;
`

const ErrorMessage = styled(TEXT.Supplemental)`
  margin-top: 3px;
`

export default function TransactionPopup({hash, success, summary, info}: {hash: string; success?: boolean; summary?: string; info?: any}) {
  const {chainId} = useActiveWeb3React()

  let errorMessage: string

  switch (chainId && info?.message) {
    case 'execution reverted: OVLV1: shutdown':
      errorMessage = 'Market has been shutdown.'
      break
    case 'execution reverted: OVLV1:lev<min':
      errorMessage = 'Leverage must be at least 1.'
      break
    case 'execution reverted: OVLV1:lev>max':
      errorMessage = 'Leverage is greater than max.'
      break
    case 'execution reverted: OVLV1:fraction>max':
      errorMessage = 'Fraction cannot equal greater than 1.'
      break
    case 'execution reverted: OVLV1:fraction<min':
      errorMessage = 'Fraction cannot equal less than 0.'
      break
    case 'execution reverted: OVLV1:!position':
      errorMessage = 'Position does not currently exist.'
      break
    case 'execution reverted: OVLV1:collateral<min':
      errorMessage = 'Input collateral is less than minimum required collateral.'
      break
    case 'execution reverted: OVLV1:oi>cap':
      errorMessage = 'Attempting to build position that will exceed market oi cap!'
      break
    case 'execution reverted: OVLV1:slippage>max':
      errorMessage = 'User selected price limit is outside the range of the current market price.'
      break
    case 'execution reverted: OVLV1:!data':
      errorMessage = 'Market price volatility has exceeded risk tolerance in the last hour.'
      break
    case 'execution reverted: OVLV1:oi==0':
      errorMessage = 'Underlying price feed price points are too high. Unable to reliably estimate oi.'
      break
    case 'execution reverted: OVLV1:liquidatable':
      errorMessage = 'Cannot build/unwind due to being liquidatable at execution time.'
      break
    case 'execution reverted: OVLV1:!liquidatable':
      errorMessage = 'Position is currently not liquidatable.'
      break
    case 'execution reverted: ERC20: transfer amount exceeds balance':
      errorMessage = 'Not enough balance.'
      break
    default:
      errorMessage = 'Undefined error. Please look into console'
  }

  return (
    <PopupContentsContainer>
      <Icon>{success ? <CheckCircle width={22} height={22} color={'#10DCB1'} /> : <AlertTriangle width={22} height={22} color={'#FF648A'} />}</Icon>
      <PopupTextContainer>
        <TEXT.BoldSmallBody>
          {info?.type === TransactionType.APPROVAL && 'Spending Limit Approved'}
          {info?.type === TransactionType.BUILD_OVL_POSITION && 'Position Successfully Built'}
          {info?.type === TransactionType.UNWIND_OVL_POSITION && 'Unwind Successful'}
          {info?.type === TransactionType.LIQUIDATE_OVL_POSITION && 'Liquidation Successful'}
          {info?.type === TransactionType.BRIDGE_OVL && 'Bridge Successful'}
          {info?.type === TransactionType.CLAIM_OVL && 'Claim Successful'}
          {/* {summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)} */}
          {info?.code === 4001 && 'Transaction Rejected'}
          {info?.code === 'ACTION_REJECTED' && 'Transaction Rejected'}
          {info?.code === -32603 && 'Transaction Failed'}
        </TEXT.BoldSmallBody>

        {info?.message && <ErrorMessage>{errorMessage}</ErrorMessage>}

        {/* {chainId && info?.message && (
          <ErrorMessage>
            { info?.message }
          </ErrorMessage>
        )} */}

        {chainId && hash && success && (
          <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}>
            <ExternalLinkContentsContainer>
              <TEXT.SmallBody>View on explorer</TEXT.SmallBody>
              <IconContainer margin={'1px 3px 0'}>
                <ExternalLinkIcon width={13} height={13} />
              </IconContainer>
            </ExternalLinkContentsContainer>
          </ExternalLink>
        )}
      </PopupTextContainer>
    </PopupContentsContainer>
  )
}
