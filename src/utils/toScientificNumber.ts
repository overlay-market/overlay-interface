import BigNumber from 'bignumber.js'

const BIG_ZERO = new BigNumber(0)
const BIG_ONE = new BigNumber(1)

const TRILLION = BIG_ONE.shiftedBy(12)
const BILLION = BIG_ONE.shiftedBy(9)
const MILLION = BIG_ONE.shiftedBy(6)

const parseBigNumberOrZero = (input: string | BigNumber | number | null) => {
  if (!input) return BIG_ZERO

  // Remove any commas
  let inputStr = String(input).replace(/,/g, '')

  const result = BigNumber.isBigNumber(inputStr) ? new BigNumber(inputStr) : new BigNumber(inputStr)

  if (!result.isFinite() || result.isNaN()) return BIG_ZERO

  return result
}

const toPrecisionTrim = (value: BigNumber, significantFigures: number) => {
  let formattedValue = value.toPrecision(significantFigures).replace(/(\.[0-9]*?)0+$/, '$1')
  return formattedValue.endsWith('.') ? formattedValue.slice(0, -1) : formattedValue
}

export const toScientificNumber = (input: string | BigNumber | number | null) => {
  const value = parseBigNumberOrZero(input)

  // Check if the value is zero
  if (value.isZero()) {
    return value.toFixed()
  }

  // Check if the value is less than 1 million
  if (value.abs().lt(MILLION)) {
    return toPrecisionTrim(value, 6)
  }

  // Check if the value is less than 1 billion
  if (value.abs().lt(BILLION)) {
    return `${toPrecisionTrim(value.div(MILLION), 6)}M`
  }

  // Check if the value is less than 1 trillion
  if (value.abs().lt(TRILLION)) {
    return `${toPrecisionTrim(value.div(BILLION), 6)}B`
  }

  // Value is greater than or equal to 1 trillion
  return `${toPrecisionTrim(value.div(TRILLION), 6)}T`
}
