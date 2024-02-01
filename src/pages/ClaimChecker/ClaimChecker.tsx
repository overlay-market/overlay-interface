import AddressCheckSection from './AddressCheckSection'
import EligibilitySection from './EligibilitySection'
import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {useCallback, useEffect, useMemo, useState} from 'react'
import useAxios from 'axios-hooks'
import {AIRDROP_CHECKER_API, AirdropMap, AIRDROPS, AirdropType, AirdropStatus} from '../../constants/claims'
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

const Gradient = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 160%;
  color: transparent;
  --grad: linear-gradient(89deg, #d5b4ff -1.18%, #ffa1b9 26.07%, #ff648a 47.56%, #ffcc8f 64.85%, #d5b4ff 99.44%);
  background: var(--grad), var(--grad) bottom 1px left 0/100% 1px no-repeat;
  background-clip: text, padding-box;
  -webkit-background-clip: text, padding-box;
`

const ClaimChecker = () => {
  const [addresses, setAddresses] = useState<string>('')
  const [validAddresses, setValidAddresses] = useState<string[] | undefined>([])
  const [detectedInvalidAddresses, setDetectedInvalidAddresses] = useState<boolean>(false)
  const [isCheckBtnClicked, setIsCheckBtnClicked] = useState(false)

  function getAirdrops(active: boolean) {
    const mapToObject = (map: Map<string, AirdropType>) => Object.fromEntries(map.entries())

    const newOb = new Map<string, AirdropType>()
    const statusArray = active ? [AirdropStatus.ACTIVATED, AirdropStatus.COMING_SOON] : [AirdropStatus.TBA]

    Object.keys(AIRDROPS)
      .filter(airdropId => statusArray.includes(AIRDROPS[airdropId].status))
      .map(adr => {
        return newOb.set(adr, AIRDROPS[adr])
      })

    return mapToObject(newOb)
  }

  const activeAirdrops: AirdropMap = getAirdrops(true) // activated and coming soon
  const TBAairdrops: AirdropMap = getAirdrops(false) // TBA
  const allAirdrops: AirdropMap = {...activeAirdrops, ...TBAairdrops}
  const activeAirdropsEnum = Object.keys(activeAirdrops).map(airdrop => airdrop.toUpperCase().replace(/-/g, '_'))

  let requestData = useMemo(() => {
    const processedAddresses = addresses
      .split('\n')
      .filter(el => el.trim())
      .map(el => el.trim()) // get rid of empty lines and spaces
      .map(el => el.toLowerCase()) // get rid of empty lines and spaces
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
        setIsCheckBtnClicked(true)
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

  const invalidAddresses = useMemo<string[]>(() => {
    if (responseData) {
      return responseData.invalidAddresses
    }
  }, [responseData])

  useEffect(() => {
    if (isCheckBtnClicked) {
      setValidAddresses(requestData.users.filter(user => !invalidAddresses.includes(user)))
      setDetectedInvalidAddresses(invalidAddresses.length > 0)
      setIsCheckBtnClicked(false)
    }
  }, [isCheckBtnClicked])

  const getAddressRows = useCallback(() => {
    let addressRows: AddressRowsType = {}

    // get addressRows when there are active airdrops
    Object.keys(addressResults).forEach(address => {
      addressRows = {
        ...addressRows,
        [address]: [],
      }

      activeAirdropsEnum.forEach(airdropId => {
        const airdropIdAmount = addressResults[address].find(item => item.airdropID === airdropId)!
        addressRows[address].push(airdropIdAmount['amount'] ? (+airdropIdAmount['amount'] / 1e18).toFixed(0).toString() : 'N/A')
      })

      Object.keys(TBAairdrops).forEach(() => addressRows[address].push('TBA'))
    })

    // get addressRows when there are no active airdrops
    if (validAddresses && activeAirdropsEnum.length === 0) {
      validAddresses.forEach(address => {
        addressRows = {
          ...addressRows,
          [address]: [],
        }

        Object.keys(TBAairdrops).forEach(() => addressRows[address].push('TBA'))
      })
    }

    return addressRows
  }, [addressResults, activeAirdropsEnum, TBAairdrops])

  const getTotalAmountValues = useCallback(() => {
    let totalAmountsRow: string[] = []

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
              .plus(Big((Number(curVal) / 1e18).toFixed(0).toString()))
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
        <BoldHeader1>Airdrop 1 Eligibility Checker 🪂</BoldHeader1>
        <TEXT.StandardBody color={colors(true).dark.blue1}>
          Check eligibility for Airdrop 1. Airdrop 1 is for{' '}
          <span style={{fontWeight: '700'}}>ex-OVL holders, PlanckCat DAO NFT Holders, Overlay Hoodie buyers,</span> and{' '}
          <span style={{fontWeight: '700'}}>Overlay NFT holders.</span>
        </TEXT.StandardBody>
        <TEXT.StandardBody color={colors(true).dark.blue1}>
          Not eligible? ;’( Don’t worry :)
          <span style={{fontWeight: '700'}}> Airdrop 2 </span>
          campaign is live now.
          <a
            href="https://mirror.xyz/0x7999C7f0b9f2259434b7aD130bBe36723a49E14e/Q5OmkZ7eXCZ8AgrDy37IaLfTQouVR9R1U3mmiRDDdz8"
            target="_blank"
            style={{textDecoration: 'none'}}
          >
            <Gradient> Check out this article to learn more about Airdrop 2, aka TUNA by Overlay.</Gradient>{' '}
          </a>
        </TEXT.StandardBody>
      </TitleSection>
      <AddressCheckSection
        addresses={addresses}
        setAddresses={setAddresses}
        checkAddressesHandle={checkAddressesHandle}
        detectedInvalidAddresses={detectedInvalidAddresses}
        setDetectedInvalidAddresses={setDetectedInvalidAddresses}
        loading={loading}
      />

      <EligibilitySection airdrops={allAirdrops} addressRows={addressRows} totalAmountValues={totalAmountValues} />
    </PageWrapper>
  )
}

export default ClaimChecker
