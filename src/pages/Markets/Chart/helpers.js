export function isSepolia(symbolInfo) {
  return (
    String(symbolInfo?.marketAddress).toLowerCase() === '0x6aa41b8f2f858723aafcf388a90d34d1cb1162d9' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xf2ddf700fc481be8ce1f228da5c913f1a25a2d2d' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x553de578e68a4faa55d4522665cb2d2d53390d22'
  )
}

export function getBinSizeAndUnit(input: string): {binSize: number, binUnit: 'minute' | 'day' | 'week' | 'month'} | null {
  const numValue = Number(input)

  if (!isNaN(numValue) && isFinite(numValue)) {
    return {
      binSize: numValue,
      binUnit: 'minute',
    }
  }

  const dayRegex = /^(\d+)D$/
  const weekRegex = /^(\d+)W$/
  const monthRegex = /^(\d+)M$/

  if (dayRegex.test(input)) {
    const match = dayRegex.exec(input)
    if (match) {
      const numValueD = Number(match[1])
      if (!isNaN(numValueD) && isFinite(numValueD)) {
        return {
          binSize: numValueD,
          binUnit: 'day',
        }
      }
    }
  }

  if (weekRegex.test(input)) {
    const match = weekRegex.exec(input)
    if (match) {
      const numValueW = Number(match[1])
      if (!isNaN(numValueW) && isFinite(numValueW)) {
        return {
          binSize: numValueW,
          binUnit: 'week',
        }
      }
    }
  }

  if (monthRegex.test(input)) {
    const match = monthRegex.exec(input)
    if (match) {
      const numValueM = Number(match[1])
      if (!isNaN(numValueM) && isFinite(numValueM)) {
        return {
          binSize: numValueM,
          binUnit: 'month',
        }
      }
    }
  }

  return null
}
