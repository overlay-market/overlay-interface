import {StyledTableCellThin, StyledTableRow} from '../../components/Table/Table'
import {FlexRow} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {useThirdWebStakingContract} from '../../hooks/useContract'
import {useSingleCallResult} from '../../state/multicall/hooks'
import {useActiveWeb3React} from '../../hooks/web3'
import {BigNumber} from 'ethers'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {PoolsData} from '../../constants/stake'
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  tableCell: {
    borderBottom: '1px solid #A8A6A6',
  },
}))

export interface PoolsRowProps {
  index: number
  pool: PoolsData
  addToTotalStaked: (amount: number, index: number) => void
}

const PoolsRow = ({index, pool, addToTotalStaked}: PoolsRowProps) => {
  const classes = useStyles()
  const history = useHistory()
  const {account} = useActiveWeb3React()
  const {poolName, poolAddress} = pool

  let tvl: string | number = 0
  let poolRewards: string = '-'
  let balance: string | number = 0
  let rewards: string | number = 0

  const stakingAddress = useThirdWebStakingContract(poolAddress)
  const stakeInfo = useSingleCallResult(stakingAddress, 'getStakeInfo', [account || '0x0000000000000000000000000000000000000000'])
  const stakingTokenBalance = useSingleCallResult(stakingAddress, 'stakingTokenBalance')
  const poolRewardsRatio = useSingleCallResult(stakingAddress, 'getRewardRatio')
  const getTimeUnit = useSingleCallResult(stakingAddress, 'getTimeUnit')

  const stakedAmount: BigNumber = stakeInfo?.result?.[0] ?? (BigNumber.from(0) as BigNumber)
  const rewardAmount: BigNumber = stakeInfo?.result?.[1] ?? (BigNumber.from(0) as BigNumber)
  const tvlAmount: BigNumber = stakingTokenBalance?.result?.[0] ?? (BigNumber.from(0) as BigNumber)
  const timeUnitSeconds: number = getTimeUnit?.result?.[0] ?? 0
  const secondsInDay = 86400
  const timeUnitDays = timeUnitSeconds / secondsInDay

  balance = formatBigNumber(stakedAmount, 18, 2) ?? 0
  rewards = formatBigNumber(rewardAmount, 18, 2) ?? 0
  tvl = formatBigNumber(tvlAmount, 18, 2) ?? 0
  poolRewards = `${poolRewardsRatio?.result?.[0]} NIP/${poolRewardsRatio?.result?.[1]} OVL/${
    timeUnitSeconds >= secondsInDay ? (timeUnitDays === 1 ? 'DAY' : timeUnitDays + 'd') : timeUnitSeconds / 60 + 'min'
  }`

  useEffect(() => {
    addToTotalStaked(+tvl, index - 1)
  }, [tvl, index, addToTotalStaked])

  const handleNavigate = () => {
    history.push(`/stake/${poolAddress}`)
  }

  return (
    <StyledTableRow hover={true} onClick={handleNavigate}>
      {/* Index */}
      <StyledTableCellThin id="marketIndex" className={classes.tableCell}>
        {index}
      </StyledTableCellThin>

      {/* Pool */}
      <StyledTableCellThin id="pool" className={classes.tableCell}>
        <FlexRow>
          <TEXT.BoldSmallBody>{poolName}</TEXT.BoldSmallBody>
        </FlexRow>
      </StyledTableCellThin>

      {/* TVL */}
      <StyledTableCellThin id="tvl" align="right" className={classes.tableCell}>
        <TEXT.Number>{tvl} OVL</TEXT.Number>
      </StyledTableCellThin>

      {/* Rewards */}
      <StyledTableCellThin id="volume24h" align="right" className={classes.tableCell}>
        <TEXT.Number>{poolRewards}</TEXT.Number>
      </StyledTableCellThin>

      {/* Balance */}
      <StyledTableCellThin id="balance" align="right" className={classes.tableCell}>
        <TEXT.BoldNumber>{balance} OVL</TEXT.BoldNumber>
      </StyledTableCellThin>

      {/* My Rewards */}
      <StyledTableCellThin id="rewards" align="right" className={classes.tableCell}>
        <TEXT.BoldNumber>{rewards} NIP</TEXT.BoldNumber>
      </StyledTableCellThin>
    </StyledTableRow>
  )
}

export default PoolsRow
