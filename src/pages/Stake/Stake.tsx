import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {NumericalInput} from '../../components/NumericalInput/NumericalInput'
import OverlayLogoOnlyDark from '../../assets/images/overlay-logo-only-no-background.png'
import {Image} from 'rebass'
import {TEXT} from '../../theme/theme'
import {Link} from 'react-router-dom'
import {ArrowRight} from 'react-feather'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Card, CardContent, CardMedia, CircularProgress, Grid} from '@material-ui/core'
import {Fragment, useCallback, useEffect, useMemo, useState} from 'react'
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
import {PoolsData, allPoolsData} from '../../constants/stake'
import {useStakeCallback} from '../../hooks/useStakeCallback'
import {useWithdrawCallback} from '../../hooks/useWithdrawCallback'
import {useClaimRewardsCallback} from '../../hooks/useClaimRewardsCallback'
import {useSingleCallResult} from '../../state/multicall/hooks'
import {useThirdWebStakingContract} from '../../hooks/useContract'
import {BigNumber} from 'ethers'
import {useOvlBalance} from '../../state/wallet/hooks'
import {formatBigNumber} from '../../utils/formatBigNumber'
import NipIcon from '../../assets/svg/nip-white.svg'

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
    width: '90%',
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
}))

export interface PowerCardData {
  name: string
  image: string
  powerType: string
  powerName: string
  powerValue: string
  nipCost: string
  regularCost: string
  requiredStake: string
}

const powerCards: PowerCardData[] = [
  {
    name: 'Samurai Jack',
    image: '/images/NIP-NFTs/samurai-jack.png',
    powerType: 'Rebate',
    powerName: 'Rebates on losses',
    powerValue: 'Up to 5 OVL',
    nipCost: '100 NIP',
    regularCost: '0.5 ETH',
    requiredStake: '100 OVL/7 Days',
  },
  {
    name: 'Fight for Fish',
    image: '/images/NIP-NFTs/fight-for-fish.png',
    powerType: 'Rebate',
    powerName: 'Negative fees',
    powerValue: 'Get paid to trade',
    nipCost: '200 NIP',
    regularCost: '3 ETH',
    requiredStake: '200 OVL',
  },
  {
    name: 'The Silent Warrior',
    image: '/images/NIP-NFTs/the-silent-warrior.png',
    powerType: 'Leverage',
    powerName: 'Degen Leverage',
    powerValue: '150x Leverage',
    nipCost: '500 NIP',
    regularCost: '5 ETH',
    requiredStake: '300 OVL',
  },
]

export interface PoolProps {
  poolData: PoolsData
}

const Stake = ({poolData}: PoolProps) => {
  const classes = useStyles()
  const HIDE_AIRDROP = true
  const {account} = useActiveWeb3React()
  const ovlBalance = useOvlBalance()
  const toggleWalletModal = useWalletModalToggle()
  const [poolType, setPoolType] = useState<string>('stake')
  const [inputAmount, setInputAmount] = useState<string>('')
  const [{attemptingTransaction}, setStakeState] = useState<{
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
  const [isDisabledPool, setIsDisabledPool] = useState<boolean>(false)

  const {callback: stakeCallback} = useStakeCallback(inputAmount, poolData.poolAddress)
  const {callback: withdrawCallback} = useWithdrawCallback(inputAmount, poolData.poolAddress)
  const {callback: claimRewardsCallback} = useClaimRewardsCallback(poolData.poolAddress)

  const stakingContract = useThirdWebStakingContract(poolData.poolAddress)
  const stakeInfo = useSingleCallResult(stakingContract, 'getStakeInfo', [account || '0x0000000000000000000000000000000000000000'])
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

  useEffect(() => {
    if (poolData.disabled) {
      setPoolType('withdraw')
      setIsDisabledPool(true)
      handleUserInput(utils.formatUnits(stakedAmount, 18) ?? '0')
    }
  }, [poolData.disabled, stakedAmount])

  const showApprovalFlow = useMemo(() => {
    return poolType === 'stake' && approval !== ApprovalState.APPROVED && approval !== ApprovalState.UNKNOWN
  }, [approval, poolType])

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
    setInputAmount('')
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
        setClaimState({
          attemptingTransaction: false,
        })
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
      if (Number(inputAmount) > Number(formatBigNumber(stakedAmount, 18, 6))) {
        return true
      }
    }

    return Number(inputAmount) === 0 || attemptingTransaction
  }, [inputAmount, attemptingTransaction, poolType, ovlBalance, stakedAmount])

  return (
    <Fragment>
      <FlexRow className={classes.mainRow}>
        {/* Pool info */}
        <div className={classes.poolInfoCol}>
          <FlexColumn align="flex-start" className={classes.poolInfoContainer}>
            <TEXT.BoldHeader1 fontSize={24} lineHeight={'160%'} mb={0.5}>
              {allPoolsData[0].poolName}
            </TEXT.BoldHeader1>
            <TEXT.SmallBody color={colors(true).dark.grey2} mb="13px">
              Rewards calculated by User Volume / Total Volume x Monthly Reward Pool
            </TEXT.SmallBody>
            {HIDE_AIRDROP ? null : (
              <TEXT.SmallBody color={colors(true).dark.grey2}>
                Rewards airdropped first week of every month.
                <br />
                <Link to="/" className={classes.link}>
                  Learn more <ArrowRight height={12} width={12} className={classes.arrowRight} />
                </Link>
              </TEXT.SmallBody>
            )}

            <div style={{marginTop: '46px', textAlign: 'justify'}}>
              <TEXT.StandardBody color={colors(true).dark.grey2}>
                Stakers of OVL into this pool earn rewards in the form of NIP (ERC-20). NIP can be exchanged for Power Cards, to exchange for OVL, and
                other cool things like swag.
                <br />
                <br />
              </TEXT.StandardBody>
              <TEXT.StandardBody color={colors(true).dark.grey2}>
                Overlay Protocol's native Power cards give the owner special powers like free trading, Degen leverage, and extra governance voting
                rights.
              </TEXT.StandardBody>

              <FlexRow mt={54} className={classes.keyValueDisplay}>
                <TEXT.StandardBody color={colors(true).dark.grey2}>Rewards</TEXT.StandardBody>

                <TEXT.StandardBody color={colors(true).dark.blue1}>{poolRewards}</TEXT.StandardBody>
              </FlexRow>
            </div>
          </FlexColumn>
        </div>

        {/* Pool card */}
        <div className={classes.poolCardCol}>
          <FlexColumn className={classes.poolCardContainer}>
            {/* Toggle buttons */}
            <ToggleButtonGroup className={classes.toggleButtonGroup} value={poolType} onChange={handlePoolTypeChange} exclusive>
              <ToggleButton disabled={isDisabledPool} className={classes.toggleButton} value="stake" disableRipple>
                Stake
              </ToggleButton>
              <ToggleButton className={classes.toggleButton} value="withdraw" disableRipple>
                Withdraw
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Card */}
            <div className={classes.poolCard}>
              <TEXT.Supplemental color={colors(true).dark.grey2}>
                {poolType === 'stake' ? 'Choose Staking Amount' : 'Withdraw Staked Amount'}
              </TEXT.Supplemental>

              <div className={classes.inputContainer}>
                <FlexRow justify="space-between" mb="25px">
                  <TEXT.Supplemental color={colors(true).dark.grey2}>OVL Amount</TEXT.Supplemental>
                  <TEXT.Supplemental
                    color={colors(true).dark.grey2}
                    style={{textDecoration: 'underline', cursor: 'pointer'}}
                    onClick={() =>
                      handleUserInput(poolType === 'stake' ? ovlBalance?.toExact() ?? '0' : formatBigNumber(stakedAmount, 18, 6)?.toString() ?? '0')
                    }
                  >
                    Max: {poolType === 'stake' ? ovlBalance?.toFixed(2) : stakedAmountFormatted} OVL
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

              {/* TODO */}
              {/* <FlexRow justify="space-between" mt="16px">
                <TEXT.SmallBody color={colors(true).dark.grey2}>Est. Received APY</TEXT.SmallBody>
                <TEXT.SmallBody color={colors(true).dark.blue1}>~40%</TEXT.SmallBody>
              </FlexRow> */}
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
                  ) : poolType === 'stake' ? (
                    'Stake'
                  ) : (
                    'Withdraw'
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

        {/* My stake & NIP rewards */}
        <div className={classes.stakeRewardsCol}>
          <div className={classes.stakeRewardsCard}>
            {/* My stake */}
            <FlexRow>
              <div className={classes.iconBackground}>
                <Image src={OverlayLogoOnlyDark} alt={'Overlay Logo'} height={'32px'} width={'32px'} />
              </div>

              <div>
                <TEXT.SmallBody color={'#C4C4C4'} mb={1}>
                  My stake
                </TEXT.SmallBody>
                <TEXT.BoldNumber className={classes.totalStakedValue} fontSize={18} color={colors(true).dark.blue1} lineHeight={'24px'}>
                  {stakedAmountFormatted} OVL
                </TEXT.BoldNumber>
              </div>
            </FlexRow>

            {/* My NIP rewards */}
            <FlexRow mt={16}>
              {/* Icon */}
              <div className={classes.iconBackground}>
                <Image src={NipIcon} alt={'Overlay Logo'} height={'32px'} width={'32px'} />
              </div>

              {/* Value */}
              <div>
                <TEXT.SmallBody color={'#C4C4C4'} mb={1}>
                  My NIP Rewards
                </TEXT.SmallBody>
                <TEXT.BoldNumber className={classes.totalStakedValue} fontSize={18} color={colors(true).dark.blue1} lineHeight={'24px'}>
                  {rewardAmountFormatted} NIP
                </TEXT.BoldNumber>
              </div>
            </FlexRow>
            <Button
              className={classes.claimRewardsButton}
              disabled={rewardAmount.isZero() || attemptingClaimTransaction}
              onClick={handleClaimRewards}
            >
              Claim
            </Button>
          </div>
        </div>
      </FlexRow>
      {/* Coming Soon banner */}
      {!isDisabledPool && (
        <>
          <div style={{textAlign: 'center', paddingBottom: '20px'}}>
            <TEXT.BoldHeader1 fontSize={24} lineHeight={'160%'} mb={0.5}>
              Coming Soon: NIP-powered NFTs!
            </TEXT.BoldHeader1>
            <TEXT.StandardBody fontSize={20} lineHeight={'160%'} mb={0.5}>
              Note: Shown NFTs are EXAMPLES only. Stay tuned for updates!
            </TEXT.StandardBody>
          </div>
          <Grid container spacing={8}>
            {powerCards.map((card, idx) => (
              <Grid item xs={12} md={4} justifyContent="center">
                <Card className={classes.powerCard}>
                  {/* NIP cost */}
                  <TEXT.BoldHeader1>{card.nipCost}</TEXT.BoldHeader1>

                  {/* Image */}
                  <Card className={classes.powerCardImageCard}>
                    <CardMedia component="img" height="245" image={card.image} title={card.name} className={classes.powerCardImage} />
                    <CardContent className={classes.powerCardImageContent}>
                      <TEXT.StandardBody mb={12} fontSize="14px">
                        {card.powerName}
                      </TEXT.StandardBody>
                      <FlexRow className={classes.keyValueDisplay}>
                        <TEXT.StandardBody fontSize="14px">1/1000</TEXT.StandardBody>

                        <TEXT.StandardBody fontSize="14px">
                          {card.nipCost} / {card.regularCost}
                        </TEXT.StandardBody>
                      </FlexRow>
                    </CardContent>
                  </Card>

                  {/* Info */}
                  <FlexRow mt={32} className={classes.keyValueDisplay}>
                    <TEXT.StandardBody fontSize="14px" color={colors(true).dark.grey2}>
                      {card.powerName}
                    </TEXT.StandardBody>

                    <TEXT.StandardBody fontSize="14px" fontWeight={700} color={colors(true).dark.tan2}>
                      {card.powerValue}
                    </TEXT.StandardBody>
                  </FlexRow>

                  <FlexRow mt={16} className={classes.keyValueDisplay}>
                    <TEXT.StandardBody fontSize="14px" color={colors(true).dark.grey2}>
                      Regular cost
                    </TEXT.StandardBody>

                    <TEXT.StandardBody fontSize="14px">{card.regularCost}</TEXT.StandardBody>
                  </FlexRow>

                  <FlexRow mt={16} className={classes.keyValueDisplay}>
                    <TEXT.StandardBody fontSize="14px" color={colors(true).dark.grey2}>
                      Required Stake
                    </TEXT.StandardBody>

                    <TEXT.StandardBody fontSize="14px">{card.requiredStake}</TEXT.StandardBody>
                  </FlexRow>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Fragment>
  )
}

export default Stake
