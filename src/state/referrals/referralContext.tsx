import {createContext, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useActiveWeb3React} from '../../hooks/web3'
import {useAddPopup, useWalletModalToggle} from '../application/hooks'

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

  // console.log('referral')
  // console.log({account})

  // checkForUserReferralLink(sender, link)
  const isReferralCodeValid = (referralCode: string): boolean => {
    return false
  }

  // hasReferrer function
  const isUserReferralCodeUsed = (referralCode: string): boolean => {
    return false
  }

  // pass referrer wallet address
  // pass account wallet address
  // getUserWalletAddress(referralCode)
  const setAccountReferralCode = (referralCode: string): void => {
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

  const checkReferralCode = async (referralCode: string | null): Promise<boolean> => {
    if (!referralCode) {
      console.log('no referral code')
      return false
    }
    if (!account) {
      toggleWalletModal()
      // handle the scenario when user cancels,
      // should return user was not able to use the referral code
      return false
    }

    if (!isReferralCodeValid(referralCode)) {
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

    if (!isUserReferralCodeUsed(referralCode)) {
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

    if (isUserReferralCodeUsed(referralCode) && isReferralCodeValid(referralCode)) {
      setAccountReferralCode(referralCode)
    }

    console.log({referralCode, account})
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
