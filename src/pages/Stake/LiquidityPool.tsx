import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {NumericalInput} from '../../components/NumericalInput/NumericalInput'
import {TEXT} from '../../theme/theme'
import {Link} from 'react-router-dom'
import {ArrowRight, ExternalLink} from 'react-feather'
import {makeStyles} from '@material-ui/core/styles'
import {Button, CircularProgress} from '@material-ui/core'
import {Fragment, useCallback, useMemo, useState} from 'react'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import {darken} from '@material-ui/core/styles'
import {useActiveWeb3React} from '../../hooks/web3'
import {useWalletModalToggle} from '../../state/application/hooks'
import {ApprovalState, useApproveCallback} from '../../hooks/useApproveCallback'
import {utils} from 'ethers'
import {OVL} from '../../constants/tokens'
import {useAppSelector} from '../../state/hooks'
import {AppState} from '../../state/state'
import clsx from 'clsx'
import {colors} from '../../theme/theme'
import {PoolsData} from '../../constants/stake'
import {useStakeCallback} from '../../hooks/useStakeCallback'
import {useWithdrawCallback} from '../../hooks/useWithdrawCallback'
import {useClaimRewardsCallback} from '../../hooks/useClaimRewardsCallback'
import {useSingleCallResult} from '../../state/multicall/hooks'
import {useThirdWebStakingContract} from '../../hooks/useContract'
import {BigNumber} from 'ethers'
import {useOvlBalance} from '../../state/wallet/hooks'
import {formatBigNumber} from '../../utils/formatBigNumber'

const useStyles = makeStyles(theme => ({
  mainRow: {
    alignItems: 'start',
    marginBottom: '80px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  stakeRewardsCard: {
    display: 'flex',
    flexDirection: 'column',
    background: '#1B2131',
    border: '0.5px solid rgba(113, 206, 255, 0.5)',
    borderRadius: '8px',
    padding: '24px',
    alignItems: 'center',
    minWidth: '200px',
    width: 'fit-content',
    boxSizing: 'border-box',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      width: '100%',
    },
  },
  iconBackground: {
    position: 'relative',
    width: '64px',
    height: '64px',
    background: '#474747',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '16px',
  },
  link: {
    color: '#71CEFF',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  arrowRight: {
    verticalAlign: 'middle',
    paddingBottom: '1px',
  },
  totalStakedValue: {
    whiteSpace: 'nowrap',
    fontFamily: 'Roboto Mono',
  },
  poolInfoCol: {
    flex: '1 1 0',
  },
  poolInfoContainer: {},
  keyValueDisplay: {
    justifyContent: 'space-between',
  },
  connectWallet: {
    textDecoration: 'underline',
  },
  poolCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '345px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
  poolCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    border: '0.5px solid rgba(113, 206, 255, 0.5)',
    borderRadius: '8px',
    backgroud: '#1B2131',
    boxShadow: '0px 0px 12px 6px rgba(91, 96, 164, 0.2)',
    width: '100%',
    marginTop: theme.spacing(2),
    boxSizing: 'border-box',
  },
  toggleButtonGroup: {
    width: '100%',
    '& .MuiToggleButtonGroup-groupedHorizontal:not(:first-child)': {
      marginLeft: '-8px',
      '&.Mui-selected': {
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
      },
    },
    '& .MuiToggleButtonGroup-groupedHorizontal:not(:last-child)': {
      '&.Mui-selected': {
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
      },
    },
  },
  toggleButton: {
    width: '100%',
    borderRadius: '8px',
    border: 'none',
    textTransform: 'none',
    padding: theme.spacing(2, 0),
    background: '#474747',
    '& .MuiToggleButton-label': {
      color: '#F0F0F0',
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '17px',
    },
    '&:hover': {
      background: darken('#474747', 0.1),
    },
    '&.Mui-selected': {
      zIndex: 1,
      background: '#71CEFF',
      '& .MuiToggleButton-label': {
        color: '#202431',
      },
      '&:hover': {
        background: darken('#71CEFF', 0.1),
      },
    },
  },
  inputContainer: {
    background: '#10131D',
    borderRadius: '8px',
    padding: '8px',
    marginTop: '8px',
  },
  button: {
    marginTop: '24px',
    width: '100%',
    textTransform: 'none',
    padding: '12px',
    borderRadius: '8px',
    background: '#71CEFF',
    '&:hover': {
      background: darken('#71CEFF', 0.1),
    },
    '& .MuiButton-label': {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '30px',
      color: '#2E3343',
    },
    '&.Mui-disabled': {
      background: '#474747',
      '& .MuiButton-label': {
        color: '#F0F0F0',
      },
    },
  },
  circularProgress: {
    color: '#D9D9D9',
    marginLeft: '16px',
  },
  loadingButton: {
    border: '1px solid #BBBBBB',
  },
  claimRewardsButton: {
    marginTop: '30px',
    width: '100%',
    textTransform: 'none',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #E5F6FF',
    '& .MuiButton-label': {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '17px',
      color: '#E5F6FF',
    },
    '&.Mui-disabled': {
      border: '1px solid #A8A6A6',
      '& .MuiButton-label': {
        color: '#A8A6A6',
      },
    },
  },
  powerCard: {
    background: '#1B2131',
    border: '0.5px solid rgba(113, 206, 255, 0.5)',
    borderRadius: '8px',
    padding: '10px 16px 24px',
    boxShadow: '0px 0px 12px 6px rgba(91, 96, 164, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '340px',
  },
  powerCardImageCard: {
    background: '#1B2131',
    border: '0.5px solid rgba(113, 206, 255, 0.5)',
    boxShadow: '0px 0px 12px 6px rgba(91, 96, 164, 0.25)',
    borderRadius: '8px;',
    marginTop: '20px',
    width: '70%',
  },
  powerCardImage: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    maxHeight: '245px',
  },
  powerCardImageContent: {
    padding: '8px',
    '&.MuiCardContent-root:last-child': {
      padding: '8px',
    },
  },
  poolCardCol: {
    flex: '1 1 0',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  stakeRewardsCol: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  poolContract: {
    textDecoration: 'underline',
  },
  externalLink: {
    marginLeft: '14px',
    color: '#F8F8F8',
  },
  externalLinkIcon: {
    verticalAlign: 'middle',
  },
}))

export interface PoolProps {
  poolData: PoolsData
}

const LiquidityPool = ({poolData}: PoolProps) => {
  const classes = useStyles()
  const {account} = useActiveWeb3React()
  const ovlBalance = useOvlBalance()
  const toggleWalletModal = useWalletModalToggle()
  const [poolType, setPoolType] = useState<string>('add')
  const [inputAmount, setInputAmount] = useState<string>('0')
  const [{showConfirm, attemptingTransaction, transactionErrorMessage, transactionHash}, setStakeState] = useState<{
    showConfirm: boolean
    attemptingTransaction: boolean
    transactionErrorMessage: string | undefined
    transactionHash: string | undefined
  }>({
    showConfirm: false,
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  })
  const [{attemptingTransaction: attemptingClaimTransaction}, setClaimState] = useState<{attemptingTransaction: boolean}>({
    attemptingTransaction: false,
  })
  const chainId = useAppSelector((state: AppState) => state.application.chainId)
  const ovl = chainId ? OVL[chainId] : undefined

  const {callback: stakeCallback} = useStakeCallback(inputAmount, poolData.poolAddress)
  const {callback: withdrawCallback} = useWithdrawCallback(inputAmount, poolData.poolAddress)
  const {callback: claimRewardsCallback} = useClaimRewardsCallback(poolData.poolAddress)

  const stakingContract = useThirdWebStakingContract(poolData.poolAddress)
  const stakeInfo = useSingleCallResult(stakingContract, 'getStakeInfo', [account || '0'])
  const poolRewardsRatio = useSingleCallResult(stakingContract, 'getRewardRatio')
  const getTimeUnit = useSingleCallResult(stakingContract, 'getTimeUnit')

  const stakedAmount: BigNumber = stakeInfo?.result?.[0] ?? (BigNumber.from(0) as BigNumber)
  const rewardAmount: BigNumber = stakeInfo?.result?.[1] ?? (BigNumber.from(0) as BigNumber)
  const timeUnitSeconds: number = getTimeUnit?.result?.[0] ?? 0
  const secondsInDay = 86400
  const timeUnitDays = timeUnitSeconds / secondsInDay

  const stakedAmountFormatted = formatBigNumber(stakedAmount, 18, 2) ?? 0
  const rewardAmountFormatted = formatBigNumber(rewardAmount, 18, 2) ?? 0
  const poolRewards = `${poolRewardsRatio?.result?.[0]} NIP/${poolRewardsRatio?.result?.[1]} OVL/${
    timeUnitSeconds >= secondsInDay ? (timeUnitDays === 1 ? 'DAY' : timeUnitDays + 'd') : timeUnitSeconds / 60 + 'min'
  }`

  const [approval, approveCallback] = useApproveCallback(utils.parseUnits(inputAmount ? inputAmount : '0'), poolData.poolAddress.toLowerCase(), ovl)

  const showApprovalFlow = useMemo(() => {
    return approval !== ApprovalState.APPROVED && approval !== ApprovalState.UNKNOWN
  }, [approval])

  const handleApprove = useCallback(async () => {
    if (!inputAmount) {
      return
    }
    setStakeState({
      showConfirm: false,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    })

    approveCallback()
      .then(hash => {
        setStakeState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: undefined,
        })
      })
      .catch(error => {
        setStakeState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        })
      })
  }, [approveCallback, inputAmount])

  const handlePoolTypeChange = (event: React.MouseEvent<HTMLElement>, newPoolType: string) => {
    if (newPoolType === null) return
    setPoolType(newPoolType)
    setInputAmount('0')
  }

  const handleUserInput = (input: string) => {
    setInputAmount(input)
  }

  const handleClaimRewards = useCallback(() => {
    if (!claimRewardsCallback) return

    setClaimState({
      attemptingTransaction: true,
    })

    claimRewardsCallback()
      .then(hash => {
        setClaimState({
          attemptingTransaction: false,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }, [claimRewardsCallback])

  const handleConfirm = useCallback(() => {
    const callback = poolType === 'stake' ? stakeCallback : withdrawCallback

    if (!callback) return

    setStakeState({
      showConfirm: true,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    })

    callback()
      .then(hash => {
        setStakeState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: hash,
        })
      })
      .catch(error => {
        setStakeState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        })
      })
  }, [stakeCallback, withdrawCallback, poolType])

  const isConfirmButtonDisabled = useMemo(() => {
    if (poolType === 'stake') {
      if (Number(inputAmount) > Number(ovlBalance?.toExact() ?? 0)) {
        return true
      }
    }

    if (poolType === 'withdraw') {
      if (Number(inputAmount) > Number(stakedAmountFormatted)) {
        return true
      }
    }

    return Number(inputAmount) === 0 || attemptingTransaction
  }, [inputAmount, attemptingTransaction, poolType, ovlBalance, stakedAmountFormatted])

  return (
    <Fragment>
      <FlexRow className={classes.mainRow}>
        {/* Pool info */}
        <div className={classes.poolInfoCol}>
          <FlexColumn align="flex-start" className={classes.poolInfoContainer}>
            <TEXT.BoldHeader1 fontSize={24} lineHeight={'160%'} mb={0.5}>
              {poolData.poolName}
            </TEXT.BoldHeader1>

            <TEXT.SmallBody color={colors(true).dark.grey2} mt="40px" mb="13px">
              Rewards calculated by User Volume / Total Volume x Monthly Reward Pool
            </TEXT.SmallBody>
            <TEXT.SmallBody color={colors(true).dark.grey2}>
              Rewards airdropped first week of every month.
              <br />
              <Link to="/" className={classes.link}>
                Learn more <ArrowRight height={12} width={12} className={classes.arrowRight} />
              </Link>
            </TEXT.SmallBody>

            <TEXT.BoldStandardBody mt="40px">Earn fees on this pool by providing OVL + USDC</TEXT.BoldStandardBody>

            <TEXT.StandardBody mt="24px" className={classes.poolContract}>
              Pool contract
              <Link to="/" className={classes.externalLink}>
                <ExternalLink height={16} width={16} className={classes.externalLinkIcon} />
              </Link>
            </TEXT.StandardBody>

            <FlexRow mt={24} className={classes.keyValueDisplay}>
              <TEXT.StandardBody color={colors(true).dark.grey2}>Rewards</TEXT.StandardBody>

              <TEXT.StandardBody color={colors(true).dark.blue1}>149% APY</TEXT.StandardBody>
            </FlexRow>

            <FlexRow mt={24} className={classes.keyValueDisplay}>
              <TEXT.StandardBody color={colors(true).dark.grey2}>Reward Balance</TEXT.StandardBody>

              <TEXT.StandardBody color={colors(true).dark.blue1}>-</TEXT.StandardBody>
            </FlexRow>
          </FlexColumn>
        </div>

        {/* Pool card */}
        <div className={classes.poolCardCol}>
          <FlexColumn className={classes.poolCardContainer}>
            {/* Toggle buttons */}
            <ToggleButtonGroup className={classes.toggleButtonGroup} value={poolType} onChange={handlePoolTypeChange} exclusive>
              <ToggleButton className={classes.toggleButton} value="add" disableRipple>
                Add Liquidity
              </ToggleButton>
              <ToggleButton className={classes.toggleButton} value="remove" disableRipple>
                Remove Liquidity
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Card */}
            <div className={classes.poolCard}>
              <TEXT.Supplemental color={colors(true).dark.grey2}>Choose Amount</TEXT.Supplemental>

              <div className={classes.inputContainer}>
                <FlexRow justify="space-between" mb="25px">
                  <TEXT.Supplemental color={colors(true).dark.grey2}>OVL Amount</TEXT.Supplemental>
                  <TEXT.Supplemental color={colors(true).dark.grey2} style={{textDecoration: 'underline'}}>
                    Max: {poolType === 'add' ? ovlBalance?.toFixed(2) : stakedAmountFormatted} OVL
                  </TEXT.Supplemental>
                </FlexRow>
                <FlexRow justify="space-between">
                  <NumericalInput
                    color={colors(true).dark.blue1}
                    align="left"
                    padding="0px"
                    fontWeight="700"
                    value={inputAmount}
                    onUserInput={handleUserInput}
                  />
                  <TEXT.BoldStandardBody color={colors(true).dark.blue1}>OVL</TEXT.BoldStandardBody>
                </FlexRow>
              </div>

              <div className={classes.inputContainer} style={{marginTop: '14px'}}>
                <FlexRow justify="space-between" mb="25px">
                  <TEXT.Supplemental color={colors(true).dark.grey2}>USDC Amount</TEXT.Supplemental>
                  <TEXT.Supplemental color={colors(true).dark.grey2} style={{textDecoration: 'underline'}}>
                    Max: {poolType === 'add' ? ovlBalance?.toFixed(2) : stakedAmountFormatted} USDC
                  </TEXT.Supplemental>
                </FlexRow>
                <FlexRow justify="space-between">
                  <NumericalInput
                    color={colors(true).dark.blue1}
                    align="left"
                    padding="0px"
                    fontWeight="700"
                    value={inputAmount}
                    onUserInput={handleUserInput}
                  />
                  <TEXT.BoldStandardBody color={colors(true).dark.blue1}>USDC</TEXT.BoldStandardBody>
                </FlexRow>
              </div>

              {/* TODO */}
              <FlexRow justify="space-between" mt="22px">
                <TEXT.SmallBody color={colors(true).dark.grey2}>Est. Received APY</TEXT.SmallBody>
                <TEXT.SmallBody color={colors(true).dark.blue1}>~40%</TEXT.SmallBody>
              </FlexRow>
            </div>

            {account ? (
              showApprovalFlow ? (
                <Button
                  variant="contained"
                  className={clsx(classes.button, {[classes.loadingButton]: attemptingTransaction})}
                  disabled={Number(inputAmount) === 0 || attemptingTransaction}
                  onClick={handleApprove}
                >
                  {attemptingTransaction ? (
                    <span>
                      Waiting Confirmation <CircularProgress size={16} className={classes.circularProgress} />
                    </span>
                  ) : Number(inputAmount) === 0 ? (
                    'Enter an amount'
                  ) : (
                    'Approve OVL'
                  )}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={clsx(classes.button, {[classes.loadingButton]: attemptingTransaction})}
                  disabled={isConfirmButtonDisabled}
                  onClick={handleConfirm}
                >
                  {attemptingTransaction ? (
                    <span>
                      Transaction Pending <CircularProgress size={16} className={classes.circularProgress} />
                    </span>
                  ) : Number(inputAmount) === 0 ? (
                    'Enter an amount'
                  ) : poolType === 'add' ? (
                    'Add Liquidity'
                  ) : (
                    'Remove Liquidity'
                  )}
                </Button>
              )
            ) : (
              <Button variant="contained" className={classes.button} onClick={toggleWalletModal}>
                Connect Wallet
              </Button>
            )}
          </FlexColumn>
        </div>

        {/* Empty div */}
        <div style={{flex: '1 1 0'}}></div>
      </FlexRow>
    </Fragment>
  )
}

export default LiquidityPool
