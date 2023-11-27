import React, {useState, useEffect} from 'react'
import {Button} from '@material-ui/core' // Import the necessary components from Material-UI or your UI library
import {useActiveWeb3React} from '../../hooks/web3'
import {useThirdWebStakingContract} from '../../hooks/useContract'

const WithdrawMaxButton = () => {
  const {account} = useActiveWeb3React()
  const stakingContract = useThirdWebStakingContract('...') // Pass the correct pool address

  const [stakedAmount, setStakedAmount] = useState('0')

  // Fetch the staked amount for the current user
  useEffect(() => {
    if (!account || !stakingContract) return

    stakingContract
      .getStakeInfo(account)
      .then((result: {toString: () => any}[]) => {
        const staked = result[0].toString()
        setStakedAmount(staked)
      })
      .catch((error: any) => {
        console.error('Error fetching staked amount:', error)
      })
  }, [account, stakingContract])

  const handleWithdrawMax = async () => {
    if (!account || !stakingContract || stakedAmount === '0') return

    try {
      const tx = await stakingContract.withdrawStake(stakedAmount)
      console.log('Withdrawal transaction sent:', tx)
      // Optionally, wait for the transaction to be confirmed
      // You might want to update state or perform other actions upon successful withdrawal
    } catch (error) {
      console.error('Withdrawal error:', error)
      // Handle the error (display a message to the user, etc.)
    }
  }

  return (
    <Button variant="contained" onClick={handleWithdrawMax}>
      Withdraw Max Staked Amount
    </Button>
  )
}

export default WithdrawMaxButton
