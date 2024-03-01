import {useEffect, useMemo, useState} from 'react'
import {Collapse, Container, TableBody, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow, StyledTableCell} from '../../components/Table/Table'
import {TEXT, colors} from '../../theme/theme'
import {RotatingTriangle, TriangleButton} from '../Positions/PositionsPage'
import styled from 'styled-components'
import {useTokenTransfersReferralData} from '../../state/referral/hooks'
import {OVL_TOKEN_ADDRESS, REFERRAL_CLAIM_ADDRESS} from '../../constants/addresses'
import {DEFAULT_CHAINID} from '../../constants/chains'
import {useActiveWeb3React} from '../../hooks/web3'
import formatUnixTimestampToDate from '../../utils/formatUnixTimestampToDate'
import {formatBigNumber} from '../../utils/formatBigNumber'

const RebatesStyledTable = styled(StyledTable)`
  width: 100% !important;
`

const referralPositionsColumns = ['Date', 'Amount', 'Arbiscan']

export const RebatesTable = () => {
  const {account, chainId} = useActiveWeb3React()
  const [open, setOpen] = useState<boolean>(true)
  const {
    tokenTransfersData,
    isLoading: isLoadingTokenTransers,
    refetch: refetchTokenTransfers,
    isUninitialized: isUninitializedTokenTransfers,
  } = useTokenTransfersReferralData(account, REFERRAL_CLAIM_ADDRESS[chainId ?? DEFAULT_CHAINID], OVL_TOKEN_ADDRESS[chainId ?? DEFAULT_CHAINID])

  useEffect(() => {
    !isUninitializedTokenTransfers && refetchTokenTransfers()
  }, [chainId, isLoadingTokenTransers, refetchTokenTransfers, account, isUninitializedTokenTransfers])

  console.log({tokenTransfersData})

  const sortedValues = useMemo(() => {
    interface Values {
      Date: string
      Amount: number
      Arbiscan: string
      [key: string]: string | number
    }

    const values: Values = {
      Date: '01/01/2021',
      Amount: 0,
      Arbiscan: 'https://arbiscan.io',
    }

    return tokenTransfersData?.tokenTransfers?.map(transfer => {
      return referralPositionsColumns.map(column => {
        switch (column) {
          case 'Date':
            return transfer?.transaction?.timestamp ? formatUnixTimestampToDate(transfer?.transaction?.timestamp) : null
          case 'Amount':
            return formatBigNumber(transfer?.amount, 18, 4)
          case 'Arbiscan':
            return (
              <a
                href={`https://sepolia.arbiscan.io/tx/${transfer?.transaction?.id}`}
                target="_blank"
                style={{color: colors(false).dark.blue2, cursor: 'pointer'}}
              >
                Transaction
              </a>
            )
          default:
            return ''
        }
      })
    })
  }, [tokenTransfersData])

  console.log({sortedValues})

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <Container style={{maxWidth: 'none', padding: '0'}}>
      <TEXT.BoldStandardBody mt={50} mb="16px">
        {`Rebate Distribution`}
        <TriangleButton onClick={handleToggle}>
          <RotatingTriangle color={'white'} fill={'white'} height={10} width={10} open={true} />
        </TriangleButton>
      </TEXT.BoldStandardBody>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer style={{overflow: 'hidden'}}>
          <RebatesStyledTable style={{}}>
            <TableHead>
              <StyledTableHeaderRow>
                {referralPositionsColumns.map((column: string) => {
                  return (
                    <StyledHeaderCell key={column} width={10}>
                      <TEXT.SupplementalHeader>{column}</TEXT.SupplementalHeader>
                    </StyledHeaderCell>
                  )
                })}
              </StyledTableHeaderRow>
            </TableHead>
            <TableBody>
              {sortedValues &&
                sortedValues.map(transfer => {
                  return (
                    <TableRow>
                      {transfer.map((value, index) => {
                        return (
                          <StyledTableCell key={index}>
                            <TEXT.Supplemental>{value}</TEXT.Supplemental>
                          </StyledTableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              {!sortedValues && (
                <TEXT.StandardBody mt={'16px'} color="#858585">
                  No rebate distribution yet.
                </TEXT.StandardBody>
              )}
            </TableBody>
          </RebatesStyledTable>
        </TableContainer>
      </Collapse>
    </Container>
  )
}
