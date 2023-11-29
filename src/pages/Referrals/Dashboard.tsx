import useAxios from 'axios-hooks'

import {useActiveWeb3React} from '../../hooks/web3'
import {CHAIN_SUBGRAPH_URL} from '../../state/data/slice'

const query = `query GetReferralProgram($owner: String!) {
  referralPrograms(first: 1) {
    id
    affiliateComission
    rewardToken
    totalAirdropped
    totalRewards
    traderDiscount
    referralPositions(where: {owner: $owner}) {
      isAffiliate
      totalAffiliateComission
      totalAirdroppedAmount
      totalRewardsPending
      totalTraderDiscount
    }
  }
}`

const Dashboard = () => {
  const {account: owner, chainId} = useActiveWeb3React()

  const [{data: referralPrograms, loading: referralLoading}] = useAxios(
    {
      baseURL: CHAIN_SUBGRAPH_URL[chainId ?? 1],
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data: {
        query,
        variables: {owner},
      },
    },
    {
      useCache: true,
      manual: false,
    },
  )

  if (referralLoading) return <div>Loading...</div>

  if (!referralPrograms) return <div>Error loading referral program data. Check that you are in the correct network.</div>

  const referralProgram = referralPrograms.data.referralPrograms[0]
  const referralPosition = referralProgram.referralPositions[0]

  return (
    <>
      <h2>Referral program</h2>
      <ul>
        <li>Affiliate comission: {referralProgram.affiliateComission}</li>
        <li>Reward token: {referralProgram.rewardToken}</li>
        <li>Total airdropped: {referralProgram.totalAirdropped}</li>
        <li>Total rewards: {referralProgram.totalRewards}</li>
        <li>Trader discount: {referralProgram.traderDiscount}</li>
      </ul>
      <h2>Your position</h2>
      {referralPosition ? (
        <ul>
          <li>Affiliate: {referralPosition.isAffiliate ? 'true' : 'false'}</li>
          <li>Total affiliate comission: {referralPosition.totalAffiliateComission}</li>
          <li>Total airdropped amount: {referralPosition.totalAirdroppedAmount}</li>
          <li>Total rewards pending: {referralPosition.totalRewardsPending}</li>
          <li>Total trader discount: {referralPosition.totalTraderDiscount}</li>
        </ul>
      ) : (
        <div>You are not in the referral program</div>
      )}
    </>
  )
}

export default Dashboard
