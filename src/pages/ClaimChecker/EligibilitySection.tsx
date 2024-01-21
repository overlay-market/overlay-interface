import {TEXT, colors} from '../../theme/theme'
import styled from 'styled-components'
import {TableBody, TableContainer, Table, TableHead, makeStyles, TableRow, TableCell, Box} from '@material-ui/core'
import {AirdropMap, MERKLE_DISTIBUTOR_ADDRESSES, AIRDROPS} from '../../constants/claims'
import {AddressRowsType} from './type'
import AirdropIdWithTooltip from './AirdropIdWithTooltip'
import {isAddress, shortenAddressStartEnd} from '../../utils/web3'
import {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

const useStyles = makeStyles(() => ({
  table: {
    width: 'auto',
  },
  styledLink: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '4px',
  },
  underlineRow: {
    borderBottom: '1px solid #2e3343 !important',
  },
}))

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 32px;
`

const StyledTableRow = styled(TableRow)`
  height: 55px !important;
  border-bottom: 1px solid #2e3343;
  &:last-child {
    border-bottom: none;
  }
`

const StyledTableCell = styled(TableCell)`
  font-size: 12px !important;
  border-bottom: none !important;
  text-align: right !important;
  min-width: 180px !important;
  padding: 0 !important;

  ${({theme}) => theme.mediaWidth.minSmall`
    min-width: 212px !important;
  `}

  &:first-child {
    text-align: left !important;
    min-width: 140px !important;
    padding-left: 16px !important;
  }
  &:last-child {
    padding-right: 16px !important;
  }
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  position: relative;
  color: ${colors(true).light.blue};
  :hover {
    color: ${colors(true).dark.blue2};
  }
`

const CopiedBox = styled(Box)`
  position: absolute;
  left: 120px;
  bottom: 1px;
  z-index: 100;
  padding: 4px;
  border-radius: 4px;
  color: ${colors(true).dark.black};
  background-color: ${colors(true).dark.tan1};
`

const CopyToClipboardIcon: FC = () => (
  <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-0.98776 6 6)">
      <path
        d="m9.81,8.6l-5.08,0c-0.7,0 -1.27,-0.58 -1.27,-1.3l0,-5.19c0,-0.72 0.57,-1.3 1.27,-1.3l5.08,0c0.7,0 1.27,0.58 1.27,1.3l0,5.19c0,0.72 -0.57,1.3 -1.27,1.3zm0.63,-6.49c0,-0.36 -0.28,-0.65 -0.63,-0.65l-5.08,0c-0.35,0 -0.63,0.29 -0.63,0.65l0,5.19c0,0.36 0.28,0.65 0.63,0.65l5.08,0c0.35,0 0.63,-0.29 0.63,-0.65l0,-5.19l0,0zm-8.89,2.6l0,5.19c0,0.36 0.28,0.65 0.64,0.65l5.08,0c0.35,0 0.64,-0.29 0.64,-0.65l0,-0.65l0.63,0l0,0.65c0,0.72 -0.57,1.3 -1.27,1.3l-5.08,0c-0.7,0 -1.27,-0.58 -1.27,-1.3l0,-5.19c0,-0.72 0.57,-1.3 1.27,-1.3l0.63,0l0,0.65l-0.63,0c-0.35,0 -0.63,0.29 -0.63,0.65z"
        fill="currentColor"
        id="svg_3"
      />
    </g>
  </svg>
)

const ScrollBox = styled.div`
  flex: 1;
  overflow-x: auto;
  cursor: pointer;
  background-color: transparent;

  &::-webkit-scrollbar {
    height: 12px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(46, 51, 67, 0.6);
    border-radius: 20px;
    &:hover {
      background: rgba(46, 51, 67, 0.8);
    }
  }
`

interface Props {
  airdrops: AirdropMap
  addressRows: AddressRowsType
  totalAmountValues: string[]
}

function EligibilitySection({airdrops, addressRows, totalAmountValues}: Props) {
  const classes = useStyles()
  const [copiedStatus, setCopiedStatus] = useState<'Copied' | 'Could not copy' | false>(false)
  const [copiedAddress, setCopiedAddress] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setCopiedStatus(false), 1000)
    return () => clearTimeout(timer)
  }, [copiedStatus, setCopiedStatus])

  const copyToClipboardHandle = (text: string) => {
    setCopiedAddress(text)
    navigator.clipboard.writeText(text).then(
      () => setCopiedStatus('Copied'),
      () => setCopiedStatus('Could not copy'),
    )
  }

  return (
    <>
      <TitleContainer>
        <TEXT.BoldStandardBody color={colors(false).dark.white}>Eligibility</TEXT.BoldStandardBody>
        <TEXT.SmallBody color={colors(true).dark.blue1}>View eligibility for each address here</TEXT.SmallBody>
      </TitleContainer>

      <TableContainer>
        <ScrollBox>
          <Table className={classes.table}>
            <TableHead>
              <StyledTableRow className={classes.underlineRow}>
                <StyledTableCell id="address">
                  <TEXT.Supplemental color={colors(true).dark.grey2}>Address</TEXT.Supplemental>
                </StyledTableCell>
                {airdrops &&
                  Object.keys(airdrops).map((airdropId: string) => {
                    return (
                      <StyledTableCell key={airdropId}>
                        <AirdropIdWithTooltip airdrop={airdrops[airdropId]} />
                      </StyledTableCell>
                    )
                  })}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {addressRows &&
                Object.keys(addressRows).map(address => {
                  return (
                    <StyledTableRow key={address}>
                      <StyledTableCell id="account">
                        <FlexBox onClick={() => copyToClipboardHandle(address)}>
                          <TEXT.Supplemental color={colors(true).dark.white}>
                            {isAddress(address) ? shortenAddressStartEnd(address) : address}
                          </TEXT.Supplemental>
                          <CopyToClipboardIcon />
                          {copiedStatus && copiedAddress === address && <CopiedBox>{copiedStatus}</CopiedBox>}
                        </FlexBox>
                      </StyledTableCell>
                      {addressRows[address].map((value: string, ind) => {
                        return (
                          <StyledTableCell key={ind}>
                            <TEXT.Supplemental color={colors(false).dark.white}>{value}</TEXT.Supplemental>
                          </StyledTableCell>
                        )
                      })}
                    </StyledTableRow>
                  )
                })}
              {totalAmountValues && (
                <StyledTableRow>
                  <StyledTableCell id="totalamount">
                    <TEXT.Supplemental color={colors(true).dark.grey2}>{totalAmountValues[0]}</TEXT.Supplemental>
                  </StyledTableCell>
                  {totalAmountValues.slice(1).map((value: string | number, ind) => {
                    return (
                      <StyledTableCell key={ind}>
                        <TEXT.Supplemental color={colors(false).dark.white}>{value}</TEXT.Supplemental>
                      </StyledTableCell>
                    )
                  })}
                </StyledTableRow>
              )}
              {addressRows && (
                <StyledTableRow>
                  <StyledTableCell id="claim">
                    <TEXT.Supplemental color={colors(true).dark.grey2}>Claim OVL</TEXT.Supplemental>
                  </StyledTableCell>
                  {Object.keys(AIRDROPS).map(airdropId => {
                    return (
                      <StyledTableCell key={airdropId}>
                        <Link
                          to={`/claim/${MERKLE_DISTIBUTOR_ADDRESSES[airdropId]}`}
                          target="_blank"
                          className={classes.styledLink}
                          style={{color: AIRDROPS[airdropId].isTBA ? colors(true).dark.grey1 : colors(false).dark.blue2}}
                        >
                          Claim
                          <OpenInNewIcon fontSize="inherit" />
                        </Link>
                      </StyledTableCell>
                    )
                  })}
                </StyledTableRow>
              )}
            </TableBody>

            {!addressRows && (
              <StyledTableRow>
                <TEXT.SmallBody color={colors(false).dark.blue1} sx={{padding: '16px'}}>
                  No addresses yet
                </TEXT.SmallBody>
              </StyledTableRow>
            )}
          </Table>
        </ScrollBox>
      </TableContainer>
    </>
  )
}

export default EligibilitySection
