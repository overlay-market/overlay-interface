export const limitDigitsInDecimals = (input: string | number | null | undefined, limit?: number) => {
  const sigFigConstant = limit ? limit : 4

  if (Number(input) < 1) {
    return Number(input).toLocaleString('en-US', {
      maximumSignificantDigits: sigFigConstant,
      minimumSignificantDigits: sigFigConstant,
    })
  } else {
    return Number(input).toLocaleString('en-US', {
      maximumFractionDigits: sigFigConstant,
      minimumFractionDigits: sigFigConstant,
    })
  }
}
