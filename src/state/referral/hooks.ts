import {ReferralAccountQuery, useReferralAccountQuery} from '../data/generated'
import {skipToken} from '@reduxjs/toolkit/dist/query'

export function useReferralAccountData(address: string | undefined | null): {
  isLoading: boolean
  isFetching: boolean
  isUninitialized: boolean
  isError: boolean
  error: unknown
  referralAccountData: ReferralAccountQuery | undefined
  refetch: () => void
} {
  let query = useReferralAccountFromSubgraph

  let res = query(address ?? undefined)
  const referralAccountData = res?.data

  return {
    isLoading: res?.isLoading,
    isFetching: res?.isFetching,
    isUninitialized: res?.isUninitialized,
    isError: res?.isError,
    error: res?.error,
    referralAccountData,
    refetch: res?.refetch,
  }
}

export function useReferralAccountFromSubgraph(address: string | undefined | null) {
  const accountAddress = address ? address.toLowerCase() : undefined

  return useReferralAccountQuery(accountAddress ? {account: accountAddress} : skipToken, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    skip: false,
  })
}
