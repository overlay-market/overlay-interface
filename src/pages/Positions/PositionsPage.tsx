import React, {Fragment, useEffect, useMemo, useState} from 'react'
import {ChevronDown, Play} from 'react-feather'
import styled from 'styled-components'
import {Box, Button, Collapse, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import {useActiveWeb3React} from '../../hooks/web3'
import {PageContainer} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {FlexRow, FlexContainer} from '../../components/Container/Container'
import {usePositionsTableDetails, usePositionsTableData, isOpenPositionsQuery, isUnwindsQuery, isLiquidatesQuery} from '../../state/build/hooks'
import {useTotalMarketsData} from '../../state/markets/hooks'
import {useMarketDetails} from '../../hooks/useMarketDetails'
import {ParsedMarketStateDetails, useCurrentMarketState} from '../../hooks/useCurrentMarketState'
import {OpenPosition} from './OpenPosition'
import {UnwindsTransactions} from './UnwindsTransactions'
import {LiquidatesTransactions} from './LiquidatesTransactions'
import {Overview} from './Overview'
import {colors} from '../../theme/theme'
import Pagination from '../../components/Pagination/Pagination'
import Loader from '../../components/Loaders/Loaders'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {useParams} from 'react-router-dom'
import {ColorButton} from '../../components/Button/Button'
import {CloseSelectedPositionsModal} from './CloseSelectedPositionsModal'
import {useUnwindActionHandlers} from '../../state/unwind/hooks'
import {Checkbox} from '@material-ui/core'
import {CheckboxIcon, CheckedIcon, PositionType} from './OpenPosition'
import {usePositionsState, usePositionsActionHandlers} from '../../state/positions/hooks'
import {StyledTableRow} from '../../components/Table/Table'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CustomFlexContainer = styled(FlexContainer)`
  justify-content: flex-end;
  align-items: baseline;
  flex-direction: column;
  ${({theme}) => theme.mediaWidth.minSmall`
    flex-direction: row;
    justify-content: space-between;
  `}
`

const CustomFlexRow = styled(FlexRow)`
  justify-content: flex-start;
  ${({theme}) => theme.mediaWidth.minSmall`
    justify-content: flex-end;
  `}
`

const CustomHeaderCell = styled(StyledHeaderCell)`
  padding-right: 16px !important;
  padding-left: 16px !important;
`
const MarketHeaderCell = styled(StyledHeaderCell)`
  padding-left: 0 !important;
  padding-right: 16px !important;
`

const DesktopColorButton = styled(ColorButton)`
  display: none;
  ${({theme}) => theme.mediaWidth.minMedium`
    display: block;
  `}
`

const liquidatedColumns = ['Market', 'Size', 'Position', 'Entry Price', 'Exit Price', 'Created', 'Liquidated']

const openPositionsColumns = ['Market', 'Size', 'Position', 'Entry Price', 'Current Price', 'Liq. Price', 'Created', 'Unrealized PnL', 'Funding']

const selectOpenPositionsColumns = [
  'Checkbox',
  'Market',
  'Size',
  'Position',
  'Entry Price',
  'Current Price',
  'Liq. Price',
  'Created',
  'Unrealized PnL',
  'Funding',
]

const closedPositionsColumns = ['Market', 'Size', 'Position', 'Entry Price', 'Exit Price', 'Created', 'Closed', 'PnL']

const buildPositionsColumns = ['Size', 'Position', 'Entry Price', 'Liq. Price', 'Unrealized PnL']

const positionColumns = {
  open: openPositionsColumns,
  closed: closedPositionsColumns,
  liquidated: liquidatedColumns,
  build: buildPositionsColumns,
  selectOpen: selectOpenPositionsColumns,
}

interface PositionsTableProps {
  title: string
  children?: React.ReactNode
  marginTop?: string
  positionStatus: PositionStatus
  initialCollateral?: string
  rowsCount: number
  marketsData: ParsedMarketStateDetails[]
}

export enum PositionStatus {
  Open = 'open',
  Closed = 'closed',
  Liquidated = 'liquidated',
  Build = 'build',
  SelectOpen = 'selectOpen',
}

export const TriangleButton = styled(Button)`
  padding: 0 !important;
  padding-bottom: 2px !important;
  width: auto;
  min-width: 20px !important;
  margin-left: 4px !important;
`

interface RotatingTriangleProps {
  open: boolean
}

export const RotatingTriangle = styled(Play)<RotatingTriangleProps>`
  transform: ${props => (props.open ? 'rotate(270deg)' : 'rotate(90deg)')};
  transition: transform ease-out 0.25s;
`

const Dropdown = styled.div`
  position: relative;
  padding: 6.5px 10px;
  background: ${({theme}) => theme.dark.grey4};
  border-radius: 4px;
  margin-left: 8px;
  box-sizing: border-box;
  max-width: 104px;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    .dropdown-menu {
      display: block;
    }

    .chevron {
      transform: rotate(180deg);
    }
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  background: ${({theme}) => theme.dark.grey4};
  border-radius: 0 0 4px 4px;
  display: none;

  > div {
    border-radius: 4px;
    padding: 6.5px 10px;
    box-sizing: border-box;
    width: 104px;
    white-space: nowrap;

    &:hover {
      box-shadow: 0px 0px 4px 2px rgba(180, 229, 255, 0.3);
    }
  }
`

const RotatingChevron = styled(ChevronDown)`
  margin-left: 8px;
  transition: transform ease-out 0.25s;
`

const StyledTableCell = styled(TableCell)`
  text-align: center !important;
`

const StyledTableNewRow = styled(StyledTableRow)`
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  text-align: center;
  height: 69px;
  ${({theme}) => theme.mediaWidth.minMedium`
    height: 50px;
  `}
`

const ROWS_PER_PAGE = [10, 20, 40, 50]

const PositionsTable = ({title, marginTop, positionStatus, rowsCount, marketsData}: PositionsTableProps) => {
  const {account, chainId} = useActiveWeb3React()
  const [open, setOpen] = useState<boolean>(true)
  const curPage = sessionStorage.getItem(`${positionStatus}Page`)
  const [page, setPage] = useState<number>(curPage ? +curPage : 1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE[0])
  const {onAmountInput} = useUnwindActionHandlers()
  const [isOpenCloseAllPositionsOption, setIsOpenCloseAllPositionsOption] = useState(false)
  const [showCloseSelPositionsModal, setShowSelPositionsModal] = useState(false)
  const [selectedPositionsList, setSelectedPositionsList] = useState<string[]>([])
  const [disabledPositionsList, setDisabledPositionsList] = useState<string[]>([])
  const [marketColumnChecked, setMarketColumnChecked] = useState(false)
  const {positionsTableData, isUninitialized, isLoading, isFetching, refetch} = usePositionsTableData(
    account,
    rowsPerPage,
    (page - 1) * rowsPerPage,
    positionStatus,
    undefined,
  )
  const [showLoader, setShowLoader] = useState(false)
  const isMetamask = window?.ethereum?.isMetaMask
  const {isUnwoundPosition} = usePositionsState()

  useEffect(() => {
    !isUninitialized && refetch()
  }, [chainId, isUninitialized, refetch])

  useEffect(() => {
    positionsTableData && !positionsTableData.account && refetch()
  }, [refetch, positionsTableData])

  useEffect(() => {
    if (isUnwoundPosition) {
      const interval = setInterval(() => {
        refetch()
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isUnwoundPosition, refetch, isFetching])

  // Show loader only on page change
  useEffect(() => {
    setShowLoader(true)
  }, [page])

  useEffect(() => {
    setShowLoader(false)
  }, [positionsTableData])

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleRowsPerPageChange = (newValue: number) => {
    setRowsPerPage(newValue)
    setPage(1)
    sessionStorage.setItem(`${positionStatus}Page`, '1')
  }

  const openClosePositionsOption = () => {
    setSelectedPositionsList([])
    setMarketColumnChecked(false)
    setIsOpenCloseAllPositionsOption(true)
  }

  const handleCancel = () => {
    setIsOpenCloseAllPositionsOption(false)
  }

  const handleClosePositions = () => {
    onAmountInput('100')
    setShowSelPositionsModal(true)
  }

  useEffect(() => {
    const allIdsList =
      marketColumnChecked &&
      positionsTableData &&
      positionStatus === PositionStatus.Open &&
      isOpenPositionsQuery(positionsTableData) &&
      positionsTableData?.account?.positions!.map((el: PositionType) => el.id).filter(id => !disabledPositionsList.includes(id))

    marketColumnChecked && allIdsList && setSelectedPositionsList(allIdsList)
  }, [marketColumnChecked, setMarketColumnChecked, positionsTableData, setRowsPerPage, positionStatus])

  const handleChangeMarketCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(rowsCount > 10 ? rowsCount : rowsPerPage)
    page > 1 && setPage(1)

    !event.target.checked && setSelectedPositionsList([])

    setMarketColumnChecked(event.target.checked)
  }

  const pageCount = useMemo(() => {
    return Math.ceil(rowsCount / rowsPerPage)
  }, [rowsCount, rowsPerPage])

  const paginatedRows = useMemo(() => {
    if (!positionsTableData) return null

    const rows =
      positionStatus === PositionStatus.Open
        ? isOpenPositionsQuery(positionsTableData)
          ? positionsTableData.account?.positions ?? []
          : []
        : positionStatus === PositionStatus.Closed
        ? isUnwindsQuery(positionsTableData)
          ? positionsTableData.account?.unwinds ?? []
          : []
        : positionStatus === PositionStatus.Liquidated
        ? isLiquidatesQuery(positionsTableData)
          ? positionsTableData.account?.liquidates ?? []
          : []
        : []

    return account && rows && rows.length > 0 ? (
      <>
        {rows.map((row: any) => {
          const marketAddress = positionStatus === PositionStatus.Open ? row.market.id : row.position.market.id
          const marketState = marketsData.filter((market: ParsedMarketStateDetails) => market.marketAddress === marketAddress)[0]

          if (positionStatus === PositionStatus.Open && !isOpenCloseAllPositionsOption) {
            return (
              <OpenPosition
                key={row.id}
                page={page}
                position={{
                  ...marketState,
                  ...row,
                }}
                columns={positionColumns[PositionStatus.Open]}
              />
            )
          } else if (positionStatus === PositionStatus.Open && isOpenCloseAllPositionsOption) {
            return (
              <OpenPosition
                key={row.id}
                position={{
                  ...marketState,
                  ...row,
                }}
                columns={positionColumns[PositionStatus.SelectOpen]}
                isOpenCloseAllPositionsOption={isOpenCloseAllPositionsOption}
                setSelectedPositionsList={setSelectedPositionsList}
                isChecked={selectedPositionsList.includes(row.id)}
                setMarketColumnChecked={setMarketColumnChecked}
                setDisabledPositionsList={setDisabledPositionsList}
                disabledPositionsList={disabledPositionsList}
              />
            )
          } else if (positionStatus === PositionStatus.Closed) {
            return (
              <UnwindsTransactions
                key={row.id}
                page={page}
                transaction={{
                  ...row,
                  position: {
                    ...marketState,
                    ...row.position,
                  },
                }}
                columns={positionColumns[PositionStatus.Closed]}
              />
            )
          } else {
            return (
              <LiquidatesTransactions
                key={row.id}
                transaction={{
                  ...row,
                  position: {
                    ...marketState,
                    ...row.position,
                  },
                }}
                columns={positionColumns[PositionStatus.Liquidated]}
              />
            )
          }
        })}
      </>
    ) : null
  }, [positionStatus, marketsData, positionsTableData, account, isOpenCloseAllPositionsOption, selectedPositionsList])

  setTimeout(() => {
    sessionStorage.setItem(`${positionStatus}Page`, '1')
  }, 200)

  return (
    <Container>
      <CustomFlexContainer>
        <TEXT.BoldStandardBody mt={marginTop} mb="16px" style={{width: '200px'}}>
          {`${title}`}
          <TriangleButton onClick={handleToggle}>
            <RotatingTriangle color={'white'} fill={'white'} height={10} width={10} open={open} />
          </TriangleButton>
        </TEXT.BoldStandardBody>
        {positionStatus === PositionStatus.Open && !isOpenCloseAllPositionsOption && account && isMetamask && paginatedRows && (
          <DesktopColorButton color={'#e5f6ff'} bgColor={'#353b4f'} onClick={openClosePositionsOption}>
            Select position to close
          </DesktopColorButton>
        )}
        {positionStatus === PositionStatus.Open && isOpenCloseAllPositionsOption && (
          <CustomFlexRow align="baseline" style={{gap: '10px'}}>
            <ColorButton color={'#e5f6ff'} bgColor={'#353b4f'} onClick={handleCancel}>
              Cancel
            </ColorButton>
            <ColorButton disabled={selectedPositionsList.length === 0} onClick={handleClosePositions}>
              Close selected positions {selectedPositionsList.length > 0 ? `(${selectedPositionsList.length})` : null}
            </ColorButton>
          </CustomFlexRow>
        )}
      </CustomFlexContainer>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer>
          <StyledTable minWidth={PositionStatus.Build && !PositionStatus.Open ? 'unset' : PositionStatus.Open ? '100%' : ''}>
            <TableHead>
              <StyledTableHeaderRow>
                {isOpenCloseAllPositionsOption
                  ? positionColumns['selectOpen'].map((column: string) => {
                      return (
                        <Fragment key={column}>
                          {column === 'Market' ? (
                            <MarketHeaderCell>
                              <TEXT.SupplementalHeader>{column}</TEXT.SupplementalHeader>
                            </MarketHeaderCell>
                          ) : (
                            <CustomHeaderCell>
                              {column === 'Checkbox' ? (
                                <Checkbox
                                  checked={marketColumnChecked}
                                  onChange={handleChangeMarketCheckbox}
                                  checkedIcon={<CheckedIcon />}
                                  icon={<CheckboxIcon />}
                                  disableRipple
                                />
                              ) : (
                                <TEXT.SupplementalHeader>{column}</TEXT.SupplementalHeader>
                              )}
                            </CustomHeaderCell>
                          )}
                        </Fragment>
                      )
                    })
                  : positionColumns[positionStatus].map((column: string) => {
                      return (
                        <CustomHeaderCell key={column} width={20}>
                          <TEXT.SupplementalHeader>{column}</TEXT.SupplementalHeader>
                        </CustomHeaderCell>
                      )
                    })}
              </StyledTableHeaderRow>
            </TableHead>
            <TableBody>
              {showLoader ? (
                <TableRow>
                  <StyledTableCell colSpan={positionColumns[positionStatus].length}>
                    <Loader />
                  </StyledTableCell>
                </TableRow>
              ) : (
                <>
                  {isUnwoundPosition && positionStatus === PositionStatus.Closed && (
                    <StyledTableNewRow>
                      <td colSpan={10}>
                        <Loader />
                      </td>
                    </StyledTableNewRow>
                  )}
                  {paginatedRows}
                </>
              )}
            </TableBody>
          </StyledTable>
        </TableContainer>
        {paginatedRows && (
          <Box display="flex" justifyContent="flex-start" alignItems="center" paddingTop={'28px'} paddingBottom={'8px'}>
            <Pagination count={pageCount} page={page} onChange={handlePageChange} />
            <Box display="flex" alignItems="center" ml="28px">
              <TEXT.SmallBody color={colors(true).dark.grey2}>Show:</TEXT.SmallBody>
              <Dropdown>
                <Box display="flex" alignItems="center">
                  <TEXT.SmallBody color={colors(true).dark.white}>{rowsPerPage} / page</TEXT.SmallBody>
                  <RotatingChevron className="chevron" color={colors(true).dark.white} strokeWidth={1} height={18} width={18} />
                </Box>

                <DropdownMenu className="dropdown-menu">
                  {ROWS_PER_PAGE.map(
                    option =>
                      option !== rowsPerPage && (
                        <div key={option} onClick={() => handleRowsPerPageChange(option)}>
                          <TEXT.SmallBody>{option} / page</TEXT.SmallBody>
                        </div>
                      ),
                  )}
                </DropdownMenu>
              </Dropdown>
            </Box>
          </Box>
        )}
      </Collapse>

      {!account ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">No wallet connected. </TEXT.StandardBody>
        </FlexRow>
      ) : isUninitialized || isLoading ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="center !important" width="100%">
          <Loader />
        </FlexRow>
      ) : !paginatedRows ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">You have no {positionStatus} positions.</TEXT.StandardBody>
        </FlexRow>
      ) : null}
      {showCloseSelPositionsModal && (
        <CloseSelectedPositionsModal
          onClose={setShowSelPositionsModal}
          selectedPositionsList={selectedPositionsList}
          onCloseCheckboxes={setIsOpenCloseAllPositionsOption}
        />
      )}
    </Container>
  )
}

export const PositionsTableForBuildPage = ({title, marginTop, positionStatus, marketsData}: PositionsTableProps) => {
  const {account, chainId} = useActiveWeb3React()
  const [open, setOpen] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE[0])
  const params = useParams<{marketId: string}>()
  const {positionsTableData, isUninitialized, isFetching, isLoading, numberOfPositions, refetch} = usePositionsTableData(
    account,
    1000,
    0,
    positionStatus,
    params?.marketId,
  )
  const [showLoader, setShowLoader] = useState(false)
  const {isBuiltPosition} = usePositionsState()
  const {onBuildPosition} = usePositionsActionHandlers()
  const [initialNumberOfPositions, setInitialNumberOfPositions] = useState(0)

  useEffect(() => {
    !isUninitialized && refetch()
  }, [chainId, isUninitialized, refetch])

  useEffect(() => {
    positionsTableData && !positionsTableData.account && refetch()
  }, [refetch, positionsTableData])

  // Show loader only on page change
  useEffect(() => {
    setShowLoader(true)
  }, [page])

  useEffect(() => {
    setShowLoader(false)
  }, [positionsTableData])

  useEffect(() => {
    numberOfPositions && setInitialNumberOfPositions(numberOfPositions)
  }, [numberOfPositions])

  useEffect(() => {
    if (isBuiltPosition) {
      const interval = setInterval(() => {
        refetch()
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isBuiltPosition, refetch, isFetching])

  useEffect(() => {
    if (isBuiltPosition && numberOfPositions > initialNumberOfPositions) {
      setInitialNumberOfPositions(numberOfPositions)
      onBuildPosition(false)
    }
  }, [isBuiltPosition, numberOfPositions, initialNumberOfPositions, setInitialNumberOfPositions])

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleRowsPerPageChange = (newValue: number) => {
    setRowsPerPage(newValue)
    setPage(1)
  }

  const pageCount = useMemo(() => {
    const positionsAmount = positionsTableData && isOpenPositionsQuery(positionsTableData) ? positionsTableData.account?.positions ?? [] : []
    return Math.ceil(positionsAmount.length / rowsPerPage)
  }, [positionsTableData, rowsPerPage])

  const paginatedRows = useMemo(() => {
    if (!positionsTableData) return null

    const rows =
      positionStatus === PositionStatus.Build && isOpenPositionsQuery(positionsTableData)
        ? positionsTableData.account?.positions.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        : []

    setShowLoader(false)

    return account && rows && rows.length > 0 ? (
      <>
        {rows
          .map((row: any) => {
            const marketAddress = positionStatus === PositionStatus.Build ? row.market?.id : row.position?.market?.id
            const marketState = marketsData[0]

            if (positionStatus === PositionStatus.Build) {
              if (marketAddress === params?.marketId) {
                return (
                  <OpenPosition
                    key={row.id}
                    position={{
                      ...marketState,
                      ...row,
                    }}
                    columns={positionColumns[PositionStatus.Build]}
                  />
                )
              }
            }

            return null
          })
          .filter((position: any) => position !== null)}
      </>
    ) : null
  }, [positionStatus, marketsData, positionsTableData, params, page, rowsPerPage, account])

  return (
    <Container>
      <TEXT.BoldStandardBody mt={marginTop} mb="16px">
        {`${title}`}
        <TriangleButton onClick={handleToggle}>
          <RotatingTriangle color={'white'} fill={'white'} height={10} width={10} open={open} />
        </TriangleButton>
      </TEXT.BoldStandardBody>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer>
          <StyledTable minWidth={PositionStatus.Build && !PositionStatus.Open ? 'unset' : PositionStatus.Open ? '100%' : ''}>
            <TableHead>
              <StyledTableHeaderRow>
                {positionColumns[positionStatus].map((column: string) => {
                  return (
                    <StyledHeaderCell key={column} width={20}>
                      <TEXT.SupplementalHeader>{column}</TEXT.SupplementalHeader>
                    </StyledHeaderCell>
                  )
                })}
              </StyledTableHeaderRow>
            </TableHead>
            <TableBody>
              {showLoader ? (
                <TableRow>
                  <StyledTableCell colSpan={positionColumns[positionStatus].length}>
                    <Loader />
                  </StyledTableCell>
                </TableRow>
              ) : (
                <>
                  {isBuiltPosition && (
                    <StyledTableNewRow>
                      <td colSpan={6}>
                        <Loader />
                      </td>
                    </StyledTableNewRow>
                  )}
                  {paginatedRows}
                </>
              )}
            </TableBody>
          </StyledTable>
        </TableContainer>
        {paginatedRows && numberOfPositions > 10 && (
          <Box display="flex" justifyContent="flex-start" alignItems="center" paddingTop={'28px'} paddingBottom={'8px'}>
            <Pagination count={pageCount} page={page} onChange={handlePageChange} />
            <Box display="flex" alignItems="center" ml="28px">
              <TEXT.SmallBody color={colors(true).dark.grey2}>Show:</TEXT.SmallBody>
              <Dropdown>
                <Box display="flex" alignItems="center">
                  <TEXT.SmallBody color={colors(true).dark.white}>{rowsPerPage} / page</TEXT.SmallBody>
                  <RotatingChevron className="chevron" color={colors(true).dark.white} strokeWidth={1} height={18} width={18} />
                </Box>

                <DropdownMenu className="dropdown-menu">
                  {ROWS_PER_PAGE.map(
                    option =>
                      option !== rowsPerPage && (
                        <div key={option} onClick={() => handleRowsPerPageChange(option)}>
                          <TEXT.SmallBody>{option} / page</TEXT.SmallBody>
                        </div>
                      ),
                  )}
                </DropdownMenu>
              </Dropdown>
            </Box>
          </Box>
        )}
      </Collapse>

      {!account ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">No wallet connected. </TEXT.StandardBody>
        </FlexRow>
      ) : isUninitialized || isLoading ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="center !important" width="100%">
          <Loader />
        </FlexRow>
      ) : !paginatedRows ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">You have no {positionStatus} positions.</TEXT.StandardBody>
        </FlexRow>
      ) : null}
    </Container>
  )
}

const Positions = () => {
  const {account, chainId} = useActiveWeb3React()
  const {
    positionsTableDetails,
    isUninitialized: isUninitializedPosTableDetails,
    isFetching,
    refetch: refetchPositionsTableDetails,
  } = usePositionsTableDetails(account)
  const {markets, isUninitialized: isUninitializedMarkets, refetch: refetchMarkets} = useTotalMarketsData()
  const marketDetails = useMarketDetails(markets)
  const {markets: marketsData, error: currentMarketsError} = useCurrentMarketState(marketDetails)
  const {isUnwoundPosition} = usePositionsState()
  const {onUnwindPosition} = usePositionsActionHandlers()
  const [initialNumberOfUnwinds, setInitialNumberOfUnwinds] = useState<null | number>(null)

  useEffect(() => {
    !isUninitializedPosTableDetails && refetchPositionsTableDetails()
  }, [chainId, isUninitializedPosTableDetails, refetchPositionsTableDetails])

  useEffect(() => {
    !isUninitializedMarkets && refetchMarkets()
  }, [chainId, isUninitializedMarkets, refetchMarkets])

  useEffect(() => {
    currentMarketsError && refetchMarkets()
  }, [currentMarketsError, refetchMarkets, marketsData])

  useEffect(() => {
    positionsTableDetails?.numberOfUnwinds && setInitialNumberOfUnwinds(+positionsTableDetails?.numberOfUnwinds)
  }, [positionsTableDetails?.numberOfUnwinds, setInitialNumberOfUnwinds])

  useEffect(() => {
    currentMarketsError && refetchPositionsTableDetails()
  }, [currentMarketsError, refetchPositionsTableDetails, isFetching])

  useEffect(() => {
    if (isUnwoundPosition) {
      const interval = setInterval(() => {
        refetchPositionsTableDetails()
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isUnwoundPosition, refetchPositionsTableDetails, isFetching])

  useEffect(() => {
    if (isUnwoundPosition) {
      const interval = setInterval(() => {
        refetchMarkets()
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isUnwoundPosition, refetchMarkets, isFetching])

  useEffect(() => {
    if (
      isUnwoundPosition &&
      positionsTableDetails?.numberOfUnwinds &&
      initialNumberOfUnwinds &&
      Number(positionsTableDetails?.numberOfUnwinds) > initialNumberOfUnwinds
    ) {
      setInitialNumberOfUnwinds(+positionsTableDetails?.numberOfUnwinds)
      onUnwindPosition(false)
    }
  }, [isUnwoundPosition, initialNumberOfUnwinds, setInitialNumberOfUnwinds, positionsTableDetails?.numberOfUnwinds])

  return (
    <PageContainer>
      <Overview
        marginTop="50px"
        account={account}
        numberOfOpenPositions={Number(positionsTableDetails?.numberOfOpenPositions ?? 0)}
        numberOfUnwinds={Number(positionsTableDetails?.numberOfUnwinds ?? 0)}
        realizedPnl={formatBigNumber(positionsTableDetails?.realizedPnl ?? '0', 18, 6) as string}
      />
      <PositionsTable
        title="Open Positions"
        marginTop="50px"
        positionStatus={PositionStatus.Open}
        rowsCount={Number(positionsTableDetails?.numberOfOpenPositions ?? 0)}
        marketsData={marketsData}
      />
      <PositionsTable
        title="Unwinds"
        marginTop="50px"
        positionStatus={PositionStatus.Closed}
        rowsCount={Number(positionsTableDetails?.numberOfUnwinds ?? 0)}
        marketsData={marketsData}
      />
      <PositionsTable
        title="Liquidates"
        marginTop="50px"
        positionStatus={PositionStatus.Liquidated}
        rowsCount={Number(positionsTableDetails?.numberOfLiquidatedPositions ?? 0)}
        marketsData={marketsData}
      />
    </PageContainer>
  )
}

export default Positions
