import AddressCheckSection from './AddressCheckSection'
import EligibilitySection from './EligibilitySection'
import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useCallback, useMemo, useState} from 'react'
import useAxios from 'axios-hooks'
import {AIRDROP_CHECKER_API, AirdropMap, AIRDROPS, AirdropType} from '../../constants/claims'
import {AddressResults, AddressRowsType, AirdropAmount} from './type'
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
  ${({theme}) => theme.mediaWidth.minMedium`
    gap: 16px;  
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

  function getAirdrops(active: boolean) {
    const mapToObject = (map: Map<string, AirdropType>) => Object.fromEntries(map.entries())

    const newOb = new Map<string, AirdropType>()

    Object.keys(AIRDROPS)
      .filter(airdropId => AIRDROPS[airdropId].isTBA === !active)
      .map(adr => {
        return newOb.set(adr, AIRDROPS[adr])
      })

    return mapToObject(newOb)
  }

  const activeAirdrops: AirdropMap = getAirdrops(true)
  const TBAairdrops: AirdropMap = getAirdrops(false)
  const allAirdrops: AirdropMap = {...activeAirdrops, ...TBAairdrops}
  const activeAirdropsEnum = Object.keys(activeAirdrops).map(airdrop => airdrop.toUpperCase().replace(/-/g, '_'))

  let requestData = useMemo(() => {
    const processedAddresses = addresses
      .split('\n')
      .filter(el => el.trim())
      .map(el => el.trim()) // get rid of empty lines and spaces
    const finalAddresses = Array.from(new Set(processedAddresses)) // get rid of duplicates

    return {
      users: finalAddresses,
      airdrops: activeAirdropsEnum,
    }
  }, [addresses, activeAirdropsEnum])

  const [{data: responseData, loading}, getResponseData] = useAxios(
    {
      url: AIRDROP_CHECKER_API,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    {manual: true},
  )

  const checkAddressesHandle = async () => {
    if (requestData.users.length > 0) {
      try {
        await getResponseData({
          data: JSON.stringify(requestData),
        })
      } catch (error: unknown) {
        console.log(error)
      }
    }
  }

  const addressResults = useMemo<AddressResults>(() => {
    if (responseData) {
      return responseData.addressResults
    }
  }, [responseData])

  const getAddressRows = useCallback(() => {
    let addressRows: AddressRowsType = {}

    Object.keys(addressResults).forEach(address => {
      addressRows = {
        ...addressRows,
        [address]: [],
      }

      activeAirdropsEnum.forEach(airdropId => {
        const airdropIdAmount = addressResults[address].find(item => item.airdropID === airdropId)!
        addressRows[address].push(airdropIdAmount['amount'] ?? 'N/A')
      })

      Object.keys(TBAairdrops).forEach(() => addressRows[address].push('TBA'))
    })

    return addressRows
  }, [addressResults, activeAirdropsEnum, TBAairdrops])

  const getTotalAmountValues = useCallback(() => {
    let totalAmountsRow: string[] = ['Total amount']

    let arrOfAirdropMaps = Object.keys(activeAirdrops).map(airdrop => {
      const tempMap = new Map()
      tempMap.set(airdrop, [])
      return tempMap
    })

    Object.keys(addressResults).forEach((adr: string) => {
      let amountsArr: (string | null)[] = []

      addressResults[adr].map((ob: AirdropAmount) => amountsArr.push(ob['amount']))

      arrOfAirdropMaps.forEach((airdropMap, idx) => {
        const key = airdropMap.keys().next().value
        airdropMap.set(key, [...airdropMap.get(key), amountsArr[idx]])
      })
    })

    arrOfAirdropMaps.forEach(airdropMap => {
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

    arrOfAirdropMaps.forEach(airdropMap => {
      const key = airdropMap.keys().next().value
      totalAmountsRow.push(airdropMap.get(key))
    })

    Object.keys(TBAairdrops).map(() => totalAmountsRow.push('TBA'))

    return totalAmountsRow
  }, [addressResults, activeAirdrops, TBAairdrops])

  const addressRows = useMemo<AddressRowsType>(() => {
    return addressResults && getAddressRows()
  }, [addressResults, getAddressRows])

  const totalAmountValues = useMemo<string[]>(() => {
    return addressResults && getTotalAmountValues()
  }, [addressResults, getTotalAmountValues])

  return (
    <PageWrapper>
      <TitleSection>
        <BoldHeader1>Airdrop Checker</BoldHeader1>
        <TEXT.SmallBody color={colors(true).dark.blue1}>Check eligibility for different airdrops</TEXT.SmallBody>
      </TitleSection>
      <AddressCheckSection addresses={addresses} setAddresses={setAddresses} checkAddressesHandle={checkAddressesHandle} loading={loading} />

      <EligibilitySection airdrops={allAirdrops} addressRows={addressRows} totalAmountValues={totalAmountValues} />
    </PageWrapper>
  )
}

export default ClaimChecker
