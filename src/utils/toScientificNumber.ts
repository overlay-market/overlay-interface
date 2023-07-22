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

export const toScientificNumber = (input: string | BigNumber | number | null) => {
  const value = parseBigNumberOrZero(input)

  if (value.lt(MILLION)) {
    return value.toFormat()
  }

  if (value.lt(BILLION)) {
    return `${value.div(MILLION).toFormat()}M`
  }

  if (value.lt(TRILLION)) {
    return `${value.div(BILLION).toFormat()}B`
  }

  return `${value.div(TRILLION).toFormat()}T`
}
