import {createContext, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useActiveWeb3React} from '../../hooks/web3'
import {useAddPopup, useModalOpen, useWalletModalToggle} from '../application/hooks'
import useAxios from 'axios-hooks'
import {ApplicationModal} from '../application/actions'
import {REFERRALS_API} from '../../constants/referrals'

export interface IUserInfo {
  discount?: number
  referralLinks?: any
  referrer?: string
  referredCount?: number
  reward?: number
  user?: string
}
interface ReferralContextType {
  referralCode: string
  userInfo: IUserInfo
  checkReferralCodeLoading: boolean
  userInfoLoading: boolean
  setAccountReferralCodeLoading: boolean
  setReferralCode(referral: string): any
  getUserInfo(config?: any | undefined, options?: any | undefined): any
  executeCheckReferralCode(config?: any | undefined, options?: any | undefined): any
  setAccountReferralCode(referral: string): any
}

export const ReferralContext = createContext<ReferralContextType>({
  referralCode: '',
  userInfo: {},
  checkReferralCodeLoading: false,
  userInfoLoading: false,
  setAccountReferralCodeLoading: false,
  setReferralCode: () => false,
  getUserInfo: () => null,
  executeCheckReferralCode: () => null,
  setAccountReferralCode: () => null,
})

interface ReferralContextProviderProps {
  children: React.ReactNode
}

const ReferralContextProvider = ({children}: ReferralContextProviderProps) => {
  const [referralCode, setReferralCode] = useState<string>('')
  const {account, active} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const addPopup = useAddPopup()
  const location = useLocation()
  const isOpen = useModalOpen(ApplicationModal.WALLET)
  const [{loading: checkReferralCodeLoading}, executeCheckReferralCode] = useAxios({baseURL: REFERRALS_API}, {manual: true})
  const [, getReferrer] = useAxios({baseURL: REFERRALS_API}, {manual: true})
  const [{loading: addReferrerLoading}, executeAddReferrer] = useAxios({baseURL: REFERRALS_API}, {manual: true})

  const [{data: userInfo, loading: userInfoLoading}, executeGetUserInfo] = useAxios(
    {
      baseURL: REFERRALS_API,
      url: 'userInfo/' + account,
      method: 'GET',
    },
    {
      useCache: true,
      manual: false,
    },
  )

  const isReferralCodeValid = async (referralCode: string): Promise<boolean> => {
    const {data} = await executeCheckReferralCode({
      url: `checkUserName/${referralCode}`,
      method: 'GET',
    })

    return Boolean(data)
  }

  const isUserReferralCodeUsed = async (): Promise<boolean> => {
    const {data} = await executeGetUserInfo({
      url: 'userInfo/' + account,
      method: 'GET',
    })
    return !Boolean(data?.referrer)
  }

  const setAccountReferralCode = async (referralCode: string): Promise<boolean> => {
    try {
      const {data: referrerAddress} = await getReferrer({
        url: `userAddressViaLink/${referralCode}`,
        method: 'GET',
      })

      const {data} = await executeAddReferrer({
        url: `addReferral`,
        method: 'POST',
        data: {
          sender: account,
          referrer: referrerAddress,
        },
      })

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

        return true
      }
    } catch (error: any) {
      console.error('Set Account Referral Code Error: ', error)
      if (error?.response?.data?.error === 'Already has a referral') {
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
      }
    }

    return false
  }

  const checkReferralCode = async (referralCode: string | null): Promise<boolean> => {
    if (!referralCode) {
      return false
    }
    if (!account) {
      if (!isOpen && active) {
        toggleWalletModal()
      }
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
    // checkReferralCode(refParam)
    if (refParam) setReferralCode(refParam)
  }, [location, account])

  const contextValue: ReferralContextType = {
    userInfo,
    getUserInfo: executeGetUserInfo,
    userInfoLoading,
    referralCode,
    checkReferralCodeLoading,
    setReferralCode,
    executeCheckReferralCode,
    setAccountReferralCodeLoading: addReferrerLoading,
    setAccountReferralCode,
  }

  return <ReferralContext.Provider value={contextValue}>{children}</ReferralContext.Provider>
}

export default ReferralContextProvider
