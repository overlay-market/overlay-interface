import {ReactNode, useEffect, useMemo, useState} from 'react'
import {StyledTableRow, StyledTableCell} from '../../components/Table/Table'
import formatUnixTimestampToDate from '../../utils/formatUnixTimestampToDate'
import {FlexRow} from '../../components/Container/Container'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {checkIsNegative} from '../../utils/checkIsNegative'
import Loader from '../../components/Loaders/Loaders'
import {useHistory} from 'react-router-dom'
import {colors, TEXT} from '../../theme/theme'
import {toPercentUnit, toScientificNumber} from '../../utils/toScientificNumber'
import {BigNumber, ethers} from 'ethers'
import {TickMath} from '@uniswap/v3-sdk'
import JSBI from 'jsbi'
import {ParsedMarketStateDetails} from '../../hooks/useCurrentMarketState'
import {ONE_BN} from '../../constants/tokens'
import {OpenPositionsQuery} from '../../state/data/generated'
import {usePositionMulticall} from '../../hooks/usePositionMulticall'
import {Checkbox} from '@material-ui/core'
import styled from 'styled-components'
import {limitDigitsInDecimals} from '../../utils/limitDigitsInDecimals'

export const CheckboxIcon = styled('span')(() => ({
  borderRadius: 3,
  width: 18,
  height: 18,
  boxShadow: 'inset 0 0 0 1px white',
}))

export const CheckedIcon = styled(CheckboxIcon)({
  backgroundColor: colors(true).dark.blue2,
  boxShadow: 'none',
  '&::before': {
    display: 'block',
    width: 18,
    height: 18,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
})

const CheckboxPosition = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;

  ${({theme}) => theme.mediaWidth.minMedium`
    top: 5px;
  `}
`

export type PositionType = NonNullable<OpenPositionsQuery['account']>['positions'][number]
interface PositionInterface extends ParsedMarketStateDetails, PositionType {}
export interface PositionProps {
  page?: number
  position: PositionInterface
  columns: string[]
  isOpenCloseAllPositionsOption?: boolean
  setSelectedPositionsList?: Function
  isChecked?: boolean
  setMarketColumnChecked?: Function
  setDisabledPositionsList?: Function
  disabledPositionsList?: string[]
}

export const OpenPosition = ({
  page,
  position,
  columns,
  isOpenCloseAllPositionsOption,
  setSelectedPositionsList,
  isChecked,
  setMarketColumnChecked,
  setDisabledPositionsList,
  disabledPositionsList,
}: PositionProps) => {
  const {
    id,
    positionId,
    marketName,
    marketAddress,
    leverage,
    createdAtTimestamp,
    isLong,
    entryPrice,
    priceCurrency,
    parsedMid,
    decimals,
    isShutdown,
    mid,
  } = position
  const positionSide = useMemo(() => {
    if (isLong === null || isLong === undefined) return null
    return isLong ? 'Long' : 'Short'
  }, [isLong])

  const parsedCreatedTimestamp = createdAtTimestamp ? formatUnixTimestampToDate(createdAtTimestamp) : null

  const parsedEntryPrice = useMemo(() => {
    if (!entryPrice || decimals === undefined) return undefined
    return formatBigNumber(entryPrice, Number(decimals), 8)
  }, [entryPrice, decimals])

  const multicallRes = usePositionMulticall(marketAddress, positionId)
  const {value, cost, info, oiCurrent, tradingFee, liquidationPrice} = multicallRes

  const parsedValue: string | number | undefined = useMemo(() => {
    if (!value && value === undefined) return undefined
    const fullValue = formatBigNumber(value, 18, 18)
    if (fullValue === undefined) return '-'
    return +fullValue < 1 ? formatBigNumber(value, 18, 6) : formatBigNumber(value, 18, 2)
  }, [value])

  // inspired from https://github.com/Uniswap/v3-sdk/blob/db69c32e6900c34a257dee1ee293d03729c3ab9b/src/utils/priceTickConversions.ts#L14
  function tickToPrice(tick: number): BigNumber {
    const Q96 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96))
    const Q192 = JSBI.exponentiate(Q96, JSBI.BigInt(2))
    const ONE_JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))
    const sqrtRatio = TickMath.getSqrtRatioAtTick(tick)
    const ratio = JSBI.multiply(sqrtRatio, sqrtRatio)
    const ratio18 = JSBI.multiply(ratio, ONE_JSBI)
    const priceJSBI = JSBI.divide(ratio18, Q192)
    return BigNumber.from(priceJSBI.toString())
  }

  // fundingPayments = currentPrice * ( remainingOiCurrent - remainingOiInitial )
  // remainingNotionalInitial = notionalInitial * fractionRemaining
  // remainingOiInitial = remainingNotionalInitial / midPriceAtEntry
  // midPriceAtEntry = tickToPrice(midTick)
  const parsedFunding: string | number | undefined = useMemo(() => {
    if (info === undefined || !oiCurrent || !mid) return undefined
    const baseFractionRemaining = 10000
    const remainingNotionalInitial = info.notionalInitial.mul(info.fractionRemaining).div(baseFractionRemaining)

    const remainingOiInitial = remainingNotionalInitial.mul(ONE_BN).div(tickToPrice(info.midTick))
    if (remainingOiInitial.eq(0)) return undefined
    const fundingPayments = mid.mul(oiCurrent.sub(remainingOiInitial)).div(ONE_BN)

    const fullValue = formatBigNumber(fundingPayments.abs(), 18, 18)
    if (fullValue === undefined) return '-'
    return +fullValue < 1 ? formatBigNumber(fundingPayments, 18, 6) : formatBigNumber(fundingPayments, 18, 2)
  }, [info, oiCurrent, mid])

  const parsedLiquidationPrice: string | number | undefined | null = useMemo(() => {
    if (!liquidationPrice && liquidationPrice === undefined) return null
    if (decimals === undefined || decimals === null) return null
    return formatBigNumber(liquidationPrice, Number(decimals), 8)
  }, [liquidationPrice, decimals])

  const unrealizedPnL: string | number | undefined = useMemo(() => {
    if (value === undefined || cost === undefined || tradingFee === undefined) return undefined
    const diff = (+value - +cost - +tradingFee) / 10 ** 18
    return diff < 1 ? diff.toFixed(6) : diff.toFixed(2)
  }, [value, cost, tradingFee])
  const isPositionUnderwater = liquidationPrice && mid ? (isLong ? liquidationPrice.gt(mid) : liquidationPrice.lt(mid)) : false

  useEffect(() => {
    if (isOpenCloseAllPositionsOption) {
      if (isPositionUnderwater || isShutdown) {
        let tempArr = disabledPositionsList
        tempArr && tempArr.push(id)
        setDisabledPositionsList && setDisabledPositionsList(tempArr)
      }
    }
  }, [isPositionUnderwater, isShutdown, setDisabledPositionsList, disabledPositionsList, isOpenCloseAllPositionsOption])

  const [checked, setChecked] = useState(isChecked === undefined ? false : isChecked)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    !event.target.checked && setMarketColumnChecked && setMarketColumnChecked(false)
    setSelectedPositionsList &&
      setSelectedPositionsList((prev: string[]) => {
        return event.target.checked ? [...prev, id] : prev.filter(el => el !== id)
      })
  }

  useEffect(() => {
    isChecked !== undefined && setChecked(isChecked)
  }, [isChecked])

  let history = useHistory()

  function handleNavigate(location: string | undefined) {
    const string = `/positions/${location}`
    history.push(string)
    page && sessionStorage.setItem(`openPage`, `${page}`)
  }

  const positionUrl = useMemo(() => {
    if (!positionId && positionId === undefined) return undefined
    if (!id && id === undefined) return undefined
    return `${id}/${positionId}`
  }, [positionId, id])

  const sortedValues: any[] = useMemo(() => {
    interface Values {
      [key: string]: string | JSX.Element | null | undefined
      Market?: string
      Size: string | JSX.Element
      Position: JSX.Element
      'Entry Price': string
      'Current Price': string
      'Liq. Price': string
      Created?: string
      'Unrealized PnL': JSX.Element | string
      Funding: string | JSX.Element
    }

    const values: Values = !isShutdown
      ? {
          Market: marketName,
          Size: parsedValue ? `${parsedValue} OVL` : <Loader size="12px" />,
          Position: (
            <FlexRow>
              <TEXT.Supplemental mr="4px">{leverage}x</TEXT.Supplemental>
              <TEXT.BoldSupplemental color={isLong ? '#5FD0AB' : '#FF648A'}>{positionSide}</TEXT.BoldSupplemental>
            </FlexRow>
          ),
          'Entry Price': `${priceCurrency ? priceCurrency : ''}${
            parsedEntryPrice
              ? priceCurrency === '%'
                ? toPercentUnit(parsedEntryPrice)
                : toScientificNumber(limitDigitsInDecimals(parsedEntryPrice))
              : '-'
          }`,
          'Current Price': `${priceCurrency ? priceCurrency : ''}${
            parsedMid ? (priceCurrency === '%' ? toPercentUnit(parsedMid) : toScientificNumber(limitDigitsInDecimals(parsedMid))) : '-'
          }`,
          'Liq. Price': parsedLiquidationPrice
            ? `${priceCurrency ?? ''} ${
                priceCurrency === '%' ? toPercentUnit(parsedLiquidationPrice) : toScientificNumber(limitDigitsInDecimals(parsedLiquidationPrice))
              }`
            : `-`,
          Created: parsedCreatedTimestamp ?? undefined,
          'Unrealized PnL': unrealizedPnL ? <ProfitLossCell PnL={Number(unrealizedPnL)} /> : '-',
          Funding: parsedFunding ? <ProfitLossCell PnL={Number(parsedFunding)} /> : <Loader size="12px" />,
        }
      : {
          Market: marketName,
          Size: '-',
          Position: (
            <FlexRow>
              <TEXT.Supplemental mr="4px">{leverage}x</TEXT.Supplemental>
              <TEXT.BoldSupplemental color={isLong ? '#5FD0AB' : '#FF648A'}>{positionSide}</TEXT.BoldSupplemental>
            </FlexRow>
          ),
          'Entry Price': `${priceCurrency ? priceCurrency : ''}${
            parsedEntryPrice
              ? priceCurrency === '%'
                ? toPercentUnit(parsedEntryPrice)
                : toScientificNumber(limitDigitsInDecimals(parsedEntryPrice))
              : '-'
          }`,
          'Current Price': `Shut Down Market`,
          'Liq. Price': `-`,
          Created: parsedCreatedTimestamp ?? undefined,
          'Unrealized PnL': `-`,
          Funding: parsedFunding ? `${parsedFunding} OVL` : <Loader size="12px" />,
        }
    return columns.map(columnName => {
      return values[columnName]
    })
  }, [
    columns,
    marketName,
    parsedValue,
    leverage,
    isLong,
    positionSide,
    priceCurrency,
    parsedEntryPrice,
    parsedMid,
    parsedLiquidationPrice,
    parsedCreatedTimestamp,
    unrealizedPnL,
    isShutdown,
  ])

  return (
    <>
      {isOpenCloseAllPositionsOption && (
        <CheckboxWrapper>
          <Checkbox
            checked={!isPositionUnderwater && !isShutdown && checked}
            onChange={handleChange}
            checkedIcon={<CheckedIcon />}
            icon={<CheckboxIcon style={{boxShadow: isPositionUnderwater || isShutdown ? 'inset 0 0 0 1px grey' : ''}} />}
            disableRipple
            disabled={isPositionUnderwater || isShutdown}
          />
        </CheckboxWrapper>
      )}
      <StyledTableRow onClick={() => handleNavigate(positionUrl)}>
        {sortedValues.map((value, index) => {
          return (
            <StyledTableCell key={index} style={{paddingLeft: `${index === 1 ? `0` : '16px'}`}}>
              <TEXT.Supplemental>{value}</TEXT.Supplemental>
            </StyledTableCell>
          )
        })}
      </StyledTableRow>
    </>
  )
}

const ProfitLossCell = ({PnL}: {PnL: number}) => {
  return (
    <FlexRow justify="left">
      {PnL ? <TEXT.Supplemental color={checkIsNegative(PnL) ? '#FF648A' : '#5FD0AB'}>{PnL} OVL</TEXT.Supplemental> : '0.00'}
    </FlexRow>
  )
}

const CheckboxWrapper = ({children}: {children: ReactNode}) => {
  return (
    <div style={{position: 'relative'}}>
      <CheckboxPosition>{children}</CheckboxPosition>
    </div>
  )
}
