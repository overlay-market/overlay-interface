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
    String(symbolInfo?.marketAddress).toLowerCase() === '0xe35a856f1d98f101c5c60db8d02ba4dff87986b3' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x6dfe4094599c74a920285a17608ae023d707eed9' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x2011d14b00f49cc461958be682bc1443c7fd5d87' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x58cac8f5c3b398650e30f724adf57c4d21d1e900' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x73973d72eef84a8624e4ec381e8e73caff570092' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x8bfb2494f3a9b1441185cf04bb10e92e6b4fd9b9' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xecd76abb33c36dd62a7d033d26f7146801e03d4f' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x31d1e411db1a11a5741ff55d5c01c0c4cf4ac891' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xfd3362feb6a1fd9c7fdd4e314ecdaac1e54360c6' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x3966f792517e2df998c48301163c2a95bfd3eff8'
  )
}

export function isImola(symbolInfo) {
  return (
    String(symbolInfo?.marketAddress).toLowerCase() === '0xb021eb4489c230234567ca6789e53403310db090' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x13b35923944df7e27082fcef640442386487bdda' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x32abe0b73564e1f0b8981474d65dcb72ca1e4865' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xeab2fbdc9d43e785eb4065c8447d872735729aac'
  )
}

export function isBartio(symbolInfo) {
  return (
    String(symbolInfo?.marketAddress).toLowerCase() === '0xd9b217fa8a9e8ef1c8558128029564e9a50f284d' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x1c66ae94c7dd18935f1e723d6395dac27905ab0c' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x09e8641df1e963d0bb1267e51579fc2b4e3e60cd' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xb2599445aeb2fa97d5d8d02e70ffb938f3d803ee' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x3178aa08845c986cc62d8aaaac0ec1fb381d01b3' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x67d54a54d07600ea7ac68a3d5c8b5f5c28510f7d' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x3d47247220d89ad623767de2045dc5e0c5920610' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x49c4ad8b75e118a9b7bd1b89e7af029f3cb1c237' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x745d36559834f6b016fc43d2261f0709e62344e1' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x789d85fb4f104feb1cd85c7475c02f3f8e2dff5b' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x9eb938c3739bbf2b54a80add213f66fe4cd694dc' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xa7becde03da95d1dd0657710e4725342218b2876' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xa85ad94c84f2bdc48127d93d087054a5f7e5726b' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xf0d9f85295d7a41b51aa5bde08c199735fa15909' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x0befa5099b225ffdaadbba5911d464e12a75a773' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0xd27803e696f818038c19f10ca8fc509ec07ba04c' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x7883c07f0b6d8004e2c8348ab5df2113423a5629' ||
    String(symbolInfo?.marketAddress).toLowerCase() === '0x9d32d77c2213a5ff7b6e52669d32752cc092ff40'
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
