export function isSepolia(symbolInfo) {
  return (
    String(symbolInfo?.marketAddress).toLowerCase() === '0x6aa41b8f2f858723aafcf388a90d34d1cb1162d9' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xf2ddf700fc481be8ce1f228da5c913f1a25a2d2d' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x3a204d03e9b1fee01b8989333665b6c46cc1f79e' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x8340f2cd37dd22c9c8b2b8e2e77c5e8c27d99fe6' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x553de578e68a4faa55d4522665cb2d2d53390d22' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xc7f3240d983fcab7a571be484d2b4da43b95efee' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xef898dbf4f4d75bdfbdd85f781a6c1bf8edaf0ae' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xe060ea13b2e710cefc5124bb790db4823b0f602a' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x4edfb4057f3a448b2704df1a3665db4ae6371b69' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x770e3a8afc5c01855b5bd8eb5b96b23bd7af1e43' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xad90fff9d159e18cec2048dd6881e29886e4899e' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x3966f792517e2df998c48301163c2a95bfd3eff8'
  )
}

export function isBartio(symbolInfo) {
  return String(symbolInfo?.marketAddress).toLowerCase() === '0xd9b217fa8a9e8ef1c8558128029564e9a50f284d'
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
