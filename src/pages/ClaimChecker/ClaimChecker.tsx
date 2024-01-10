import AddressCheckSection from './AddressCheckSection'
import EligibilitySection from './EligibilitySection'
import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useState} from 'react'
import useAxios from 'axios-hooks'
import {AIRDROP_CHECKER_API, AirdropMap, Airdrops, AirdropType} from '../../constants/claims'
import Big from 'big.js'

const PageWrapper = styled.div`
  max-width: 1232px;
  box-sizing: border-box;
  margin: 0 auto 48px;
  padding: 16px 8px;
  ${({theme}) => theme.mediaWidth.minSmall`
    padding: 16px 24px;
  `};
  ${({theme}) => theme.mediaWidth.minMedium`
    padding: 16px 40px;
  `};
  ${({theme}) => theme.mediaWidth.minLarge`
    padding: 16px 0px;
  `};
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 32px;
  ${({theme}) => theme.mediaWidth.minSmall`
    margin: 0 auto;
    width: fit-content;
    align-items: center;
  `}
  ${({theme}) => theme.mediaWidth.minMedium`
    gap: 16px;  
    margin: 0;
    width: auto;
    align-items: flex-start;
  `}
`

const BoldHeader1 = styled(TEXT.BoldHeader1)`
  color: ${colors(true).dark.white} !important;

  ${({theme}) => theme.mediaWidth.minMedium`
    font-size: 24px !important;
    color: ${colors(false).dark.white} !important;    
  `}
`

const ClaimChecker = () => {
  const [addresses, setAddresses] = useState<string>('')

  console.log(addresses, '------')
  const addressList = addresses && addresses.split('\n')

  console.log(addressList, addressList.length)

  function getAirdrops(active: boolean) {
    const mapToObject = (map: Map<string, AirdropType>) => Object.fromEntries(map.entries())

    const newOb = new Map<string, AirdropType>()

    Object.keys(Airdrops)
      .filter(airdropId => Airdrops[airdropId].isTBA === !active)
      .map(adr => {
        return newOb.set(adr, Airdrops[adr])
      })

    return mapToObject(newOb)
  }

  const activeAirdrops: AirdropMap = getAirdrops(true)
  const TBAairdrops: AirdropMap = getAirdrops(false)
  const allAirdrops: AirdropMap = {...activeAirdrops, ...TBAairdrops}

  const res: any = {
    '0xee5ce06accce11bc77c5a93723c8032d9108f22d': [
      {
        airdropID: 'BEACON_HOLDERS',
        amount: '10000000000000000000',
      },
      {
        airdropID: 'OVERLAY',
        amount: null,
      },
    ],
    '0xc8d46eb7881975f9ae15216feeba2ff58e55803c': [
      {
        airdropID: 'BEACON_HOLDERS',
        amount: '10000000000000000000',
      },
      {
        airdropID: 'OVERLAY',
        amount: null,
      },
    ],
    '0x5B9950C198Aa3e2Ef0A8d0C1c640b6B13c3eF216': [
      {
        airdropID: 'BEACON_HOLDERS',
        amount: null,
      },
      {
        airdropID: 'OVERLAY',
        amount: '10000000000000000000',
      },
    ],
    '0x8C3a198929E8796a09f017d11B56f684679A4721': [
      {
        airdropID: 'BEACON_HOLDERS',
        amount: null,
      },
      {
        airdropID: 'OVERLAY',
        amount: null,
      },
    ],
  }

  function getTotalAmountValues() {
    let totalAmountsRow: string[] = ['Total amount']

    let arrOfAirdropMaps = Object.keys(activeAirdrops).map(airdrop => {
      const tempMap = new Map()
      tempMap.set(airdrop, [])
      return tempMap
    })

    Object.keys(res).map((adr: string) => {
      let amountsArr: (string | null)[] = []

      res[adr].map((ob: any) => amountsArr.push(ob['amount']))

      arrOfAirdropMaps.map((airdropMap, idx) => {
        const key = airdropMap.keys().next().value
        airdropMap.set(key, [...airdropMap.get(key), amountsArr[idx]])
      })
    })

    arrOfAirdropMaps.map(airdropMap => {
      const key = airdropMap.keys().next().value
      const valuesArr = airdropMap.get(key)
      let totalValue

      if (valuesArr.every((el: string | null) => el === null)) {
        totalValue = 'N/A'
      } else {
        totalValue = valuesArr.reduce(
          (accumulator: string, curVal: string) =>
            Big(accumulator)
              .plus(Big(Number(curVal).toString()))
              .toString(),
          Big('0'),
        )
      }

      airdropMap.set(key, totalValue)
    })

    arrOfAirdropMaps.map(airdropMap => {
      const key = airdropMap.keys().next().value
      totalAmountsRow.push(airdropMap.get(key))
    })

    Object.keys(TBAairdrops).map(() => totalAmountsRow.push('TBA'))

    return totalAmountsRow
  }

  const totalAmountValues = getTotalAmountValues()

  return (
    <PageWrapper>
      <TitleSection>
        <BoldHeader1>Airdrop Checker</BoldHeader1>
        <TEXT.SmallBody color={colors(true).dark.blue1}>Check eligibility for different airdrops</TEXT.SmallBody>
      </TitleSection>
      <AddressCheckSection addresses={addresses} setAddresses={setAddresses} />

      <EligibilitySection airdrops={allAirdrops} totalAmountValues={totalAmountValues} />
    </PageWrapper>
  )
}

export default ClaimChecker
