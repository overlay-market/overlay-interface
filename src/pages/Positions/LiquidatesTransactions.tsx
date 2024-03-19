import {useMemo} from 'react'
import {StyledTableRowNoPointer, StyledTableCell} from '../../components/Table/Table'
import formatUnixTimestampToDate from '../../utils/formatUnixTimestampToDate'
import {FlexRow} from '../../components/Container/Container'
import {formatBigNumber} from '../../utils/formatBigNumber'
import Loader from '../../components/Loaders/Loaders'
import {TEXT} from '../../theme/theme'
import {Build, Liquidate, Unwind} from '../../state/build/hooks'
import {toScientificNumber} from '../../utils/toScientificNumber'
import {LiquidatedPositionsQuery} from '../../state/data/generated'
import {ParsedMarketStateDetails} from '../../hooks/useCurrentMarketState'

type LiquidatesType = NonNullable<LiquidatedPositionsQuery['account']>['liquidates'][number]
type PositiopnType = LiquidatesType['position'] & ParsedMarketStateDetails
interface TransactionInterface extends LiquidatesType {
  position: PositiopnType
}
import {toPercentUnit, toScientificNumber} from '../../utils/toScientificNumber'

export interface PositionProps {
  transaction: TransactionInterface
  columns: string[]
}

export const LiquidatesTransactions = ({transaction, columns}: PositionProps) => {
  const {marketName, leverage, createdAtTimestamp, isLong, entryPrice, priceCurrency, decimals} = transaction.position
  const {price, timestamp, size} = transaction

  const positionSide = useMemo(() => {
    if (isLong === null || isLong === undefined) return null
    return isLong ? 'Long' : 'Short'
  }, [isLong])

  const parsedCreatedTimestamp = formatUnixTimestampToDate(createdAtTimestamp)
  const parsedClosedTimestamp = formatUnixTimestampToDate(timestamp)

  const parsedEntryPrice = useMemo(() => {
    if (!entryPrice || decimals === undefined) return null
    return formatBigNumber(entryPrice, Number(decimals))
  }, [entryPrice, decimals])

  const parsedExitPrice = useMemo(() => {
    if (!price || decimals === undefined) return null
    return formatBigNumber(price, Number(decimals))
  }, [price, decimals])

  const parsedSize = useMemo(() => {
    if (!size || decimals === undefined) return null
    return formatBigNumber(size, Number(decimals))
  }, [size, decimals])

  const sortedValues: any[] = useMemo(() => {
    interface Values {
      [key: string]: string | JSX.Element | null | undefined
      Market?: string
      Size: string | JSX.Element
      Position: JSX.Element
      'Entry Price': string
      'Exit Price': string
      Liquidated: string
      Created?: string
    }

    const values: Values = {
      Market: marketName,
      Size: parsedSize ? `${parsedSize} OVL` : <Loader size="12px" />,
      Position: (
        <FlexRow>
          <TEXT.Supplemental mr="4px">{leverage}x</TEXT.Supplemental>
          <TEXT.BoldSupplemental color={isLong ? '#5FD0AB' : '#FF648A'}>{positionSide}</TEXT.BoldSupplemental>
        </FlexRow>
      ),
      'Entry Price': `${priceCurrency ? priceCurrency : ''}${
        parsedEntryPrice ? (priceCurrency === '%' ? toPercentUnit(parsedEntryPrice) : toScientificNumber(parsedEntryPrice)) : '-'
      }`,
      'Exit Price': `${priceCurrency ? priceCurrency : ''}${
        parsedExitPrice ? (priceCurrency === '%' ? toPercentUnit(parsedExitPrice) : toScientificNumber(parsedExitPrice)) : '-'
      }`,
      Liquidated: parsedClosedTimestamp,
      Created: parsedCreatedTimestamp,
    }
    return columns.map(columnName => {
      return values[columnName]
    })
  }, [
    parsedClosedTimestamp,
    parsedExitPrice,
    columns,
    marketName,
    leverage,
    isLong,
    positionSide,
    priceCurrency,
    parsedEntryPrice,
    parsedCreatedTimestamp,
    parsedSize,
  ])

  return (
    <>
      <StyledTableRowNoPointer>
        {sortedValues.map(value => {
          return (
            <StyledTableCell>
              <TEXT.Supplemental>{value}</TEXT.Supplemental>
            </StyledTableCell>
          )
        })}
      </StyledTableRowNoPointer>
    </>
  )
}
