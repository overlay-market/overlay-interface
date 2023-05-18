import {createContext, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useActiveWeb3React} from '../../hooks/web3'
import {useAddPopup, useWalletModalToggle} from '../application/hooks'
import useAxios from 'axios-hooks'

interface ReferralContextType {
  referralCode: string
}

export const ReferralContext = createContext<ReferralContextType>({
  referralCode: '',
})

interface ReferralContextProviderProps {
  children: React.ReactNode
}

const ReferralContextProvider = ({children}: ReferralContextProviderProps) => {
  const [referralCode, setReferralCode] = useState('')
  const {account} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const addPopup = useAddPopup()
  const location = useLocation()

  const [, executeGetUserInfo] = useAxios(
    {
      url: 'http://localhost:8080/referral/userInfo/' + account,
      method: 'GET',
    },
    {
      useCache: true,
      manual: true,
    },
  )
  const [, executeCheckReferralCode] = useAxios({}, {manual: true})
  const [, getReferrer] = useAxios({}, {manual: true})
  const [, executeAddReferrer] = useAxios({}, {manual: true})

  const isReferralCodeValid = async (referralCode: string): Promise<boolean> => {
    const response = await executeCheckReferralCode({
      url: `http://localhost:8080/referral/checkUserName/${referralCode}`,
      method: 'GET',
    })

    return Boolean(response)
  }

  const isUserReferralCodeUsed = async (): Promise<boolean> => {
    const {data} = await executeGetUserInfo()
    return !Boolean(data?.referrer)
  }

  // should use addReferrer
  // pass referrer wallet address
  // pass account wallet address
  // getUserWalletAddress(referralCode)
  // referral/createReferralCode(AddressViaLink(referralCode), address)
  // AddressViaLink(referralCode)
  const setAccountReferralCode = async (referralCode: string): Promise<void> => {
    try {
      const {data: referrerAddress} = await getReferrer({
        url: `http://localhost:8080/referral/userAddressViaLink/${referralCode}`,
        method: 'GET',
      })

      const {data} = await executeAddReferrer({
        url: `http://localhost:8080/referral/addReferral`,
        method: 'POST',
        data: {
          sender: account,
          referrer: referrerAddress,
        },
      })

      console.log({data})

      if (data) {
        addPopup(
          {
            txn: {
              hash: '',
              success: true,
              info: {
                message: 'referral code successfully used',
              },
            },
          },
          Date.now().toString(),
        )
      }
    } catch (error) {
      // TODO: handle error
      console.log({error})
    }
  }

  const checkReferralCode = async (referralCode: string | null): Promise<boolean> => {
    if (!referralCode) {
      return false
    }
    if (!account) {
      // TODO: wait until wallet is connected
      toggleWalletModal()
      return false
    }

    if (!(await isReferralCodeValid(referralCode))) {
      addPopup(
        {
          txn: {
            hash: '',
            success: false,
            info: {
              message: 'referral code does not exist',
            },
          },
        },
        Date.now().toString(),
      )
      return false
    }

    if (!(await isUserReferralCodeUsed())) {
      addPopup(
        {
          txn: {
            hash: '',
            success: false,
            info: {
              message: 'referral code of user already used',
            },
          },
        },
        Date.now().toString(),
      )
      return false
    }

    if ((await isUserReferralCodeUsed()) && (await isReferralCodeValid(referralCode))) {
      await setAccountReferralCode(referralCode)
    }

    return false
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const refParam = queryParams.get('ref')

    // Check referral code does not exist or invalid
    // and user already has a referral code used

    // if both conditions above is false
    // tell user successfully used the referral code
    // if (refParam) {
    //   setReferralCode(refParam)
    // }
    checkReferralCode(refParam)
  }, [location, account])

  const contextValue: ReferralContextType = {
    referralCode,
  }

  return <ReferralContext.Provider value={contextValue}>{children}</ReferralContext.Provider>
}

export default ReferralContextProvider
