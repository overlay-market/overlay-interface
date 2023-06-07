import {FlexColumn, FlexRow, PageContainer} from '../../components/Container/Container'
import {NumericalInput} from '../../components/NumericalInput/NumericalInput'
import OverlayLogoOnlyDark from '../../assets/images/overlay-logo-only-no-background.png'
import {Image} from 'rebass'
import {TEXT} from '../../theme/theme'
import {Link} from 'react-router-dom'
import {ArrowLeft, ArrowRight} from 'react-feather'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Card, CardContent, CardMedia, CircularProgress, Grid} from '@material-ui/core'
import {useCallback, useEffect, useMemo, useState} from 'react'
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
import {RouteComponentProps} from 'react-router-dom'
import {useStakeCallback} from '../../hooks/useStakeCallback'

const useStyles = makeStyles(theme => ({
  arrowLeft: {
    verticalAlign: 'middle',
    paddingBottom: '2px',
  },
  backLink: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: 14,
  },
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
}))

export interface PowerCardData {
  name: string
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
    powerType: 'Rebate',
    powerName: 'Rebates on losses',
    powerValue: 'Up to 5 OVL',
    nipCost: '100 NIP',
    regularCost: '0.5 ETH',
    requiredStake: '100 OVL/7 Days',
  },
  {
    name: 'Fight for Fish',
    powerType: 'Rebate',
    powerName: 'Negative fees',
    powerValue: 'Get paid to trade',
    nipCost: '200 NIP',
    regularCost: '3 ETH',
    requiredStake: '200 OVL',
  },
  {
    name: 'The Silent Warrior',
    powerType: 'Leverage',
    powerName: 'Degen Leverage',
    powerValue: '150x Leverage',
    nipCost: '500 NIP',
    regularCost: '5 ETH',
    requiredStake: '300 OVL',
  },
]

const Pool = ({
  match: {
    params: {poolAddress},
  },
}: RouteComponentProps<{poolAddress: string}>) => {
  const classes = useStyles()
  const {account} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const [poolData, setPoolData] = useState<PoolsData | null>(null)
  const [totalStaked, setTotalStaked] = useState<number>(0)
  const [poolType, setPoolType] = useState<string>('stake')
  const [stakeAmount, setStakeAmount] = useState<string>('0')
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
  const chainId = useAppSelector((state: AppState) => state.application.chainId)
  const ovl = chainId ? OVL[chainId] : undefined

  useEffect(() => {
    const pool = allPoolsData.find(pool => pool.poolAddress === poolAddress)

    // else redirect?
    if (pool) setPoolData(pool)
  }, [poolAddress])

  const {callback: stakeCallback} = useStakeCallback(stakeAmount, poolData?.poolAddress!!)

  // TODO: fetch user rewards
  let rewards: number = 10

  const [approval, approveCallback] = useApproveCallback(utils.parseUnits(stakeAmount ? stakeAmount : '0'), poolAddress.toLowerCase(), ovl)

  const showApprovalFlow = useMemo(() => {
    return approval !== ApprovalState.APPROVED && approval !== ApprovalState.UNKNOWN
  }, [approval])

  const handleApprove = useCallback(async () => {
    if (!stakeAmount) {
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
  }, [approveCallback, stakeAmount])

  const handlePoolTypeChange = (event: React.MouseEvent<HTMLElement>, newPoolType: string) => {
    if (newPoolType === null) return
    setPoolType(newPoolType)
  }

  const handleUserInput = (input: string) => {
    setStakeAmount(input)
  }

  const handleClaimRewards = () => {}

  const handleConfirm = useCallback(() => {
    if (poolType === 'stake') {
      if (!stakeCallback) return
      setStakeState({
        showConfirm: true,
        attemptingTransaction: true,
        transactionErrorMessage: undefined,
        transactionHash: undefined,
      })
      stakeCallback()
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
    } else {
    }
  }, [stakeCallback, stakeAmount])

  return (
    <PageContainer>
      <Link to="/stake" className={clsx(classes.link, classes.backLink)}>
        <ArrowLeft strokeWidth={3} height={14} width={14} className={classes.arrowLeft} /> Back
      </Link>

      <TEXT.BoldStandardBody color={colors(true).dark.grey2} mt="26px" mb="8px">
        {allPoolsData[0].poolName}
      </TEXT.BoldStandardBody>

      <FlexRow className={classes.mainRow}>
        {/* Pool info */}
        <div className={classes.poolInfoCol}>
          <FlexColumn align="flex-start" className={classes.poolInfoContainer}>
            <TEXT.BoldHeader1 fontSize={24} lineHeight={'160%'} mb={0.5}>
              {allPoolsData[0].poolName}
            </TEXT.BoldHeader1>
            <TEXT.SmallBody color={colors(true).dark.grey2} lineHeight="17px" mb="13px">
              Rewards calculated by User Volume / Total Volume x Monthly Reward Pool
            </TEXT.SmallBody>
            <TEXT.SmallBody color={colors(true).dark.grey2} lineHeight="17px">
              Rewards airdropped first week of every month.
              <br />
              <Link to="/" className={classes.link}>
                Learn more <ArrowRight height={12} width={12} className={classes.arrowRight} />
              </Link>
            </TEXT.SmallBody>

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

                <TEXT.StandardBody color={colors(true).dark.blue1}>1 NIP/100 OVL/1min</TEXT.StandardBody>
              </FlexRow>
            </div>
          </FlexColumn>
        </div>

        {/* Pool card */}
        <div className={classes.poolCardCol}>
          <FlexColumn className={classes.poolCardContainer}>
            {/* Toggle buttons */}
            <ToggleButtonGroup className={classes.toggleButtonGroup} value={poolType} onChange={handlePoolTypeChange} exclusive>
              <ToggleButton className={classes.toggleButton} value="stake" disableRipple>
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
                  <TEXT.Supplemental color={colors(true).dark.grey2} style={{textDecoration: 'underline'}}>
                    Max: {'-'} OVL
                  </TEXT.Supplemental>
                </FlexRow>
                <FlexRow justify="space-between">
                  <NumericalInput
                    color={colors(true).dark.blue1}
                    align="left"
                    padding="0px"
                    fontWeight="700"
                    value={stakeAmount}
                    onUserInput={handleUserInput}
                  />
                  <TEXT.BoldStandardBody color={colors(true).dark.blue1}>OVL</TEXT.BoldStandardBody>
                </FlexRow>
              </div>

              <FlexRow justify="space-between" mt="16px">
                <TEXT.SmallBody color={colors(true).dark.grey2}>Est. Received APY</TEXT.SmallBody>
                <TEXT.SmallBody color={colors(true).dark.blue1}>~40%</TEXT.SmallBody>
              </FlexRow>
            </div>

            {account ? (
              showApprovalFlow ? (
                <Button
                  variant="contained"
                  className={clsx(classes.button, {[classes.loadingButton]: attemptingTransaction})}
                  disabled={Number(stakeAmount) === 0 || attemptingTransaction}
                  onClick={handleApprove}
                >
                  {attemptingTransaction ? (
                    <span>
                      Waiting Confirmation <CircularProgress size={16} className={classes.circularProgress} />
                    </span>
                  ) : Number(stakeAmount) === 0 ? (
                    'Enter an amount'
                  ) : (
                    'Approve OVL'
                  )}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={clsx(classes.button, {[classes.loadingButton]: attemptingTransaction})}
                  disabled={Number(stakeAmount) === 0 || attemptingTransaction}
                  onClick={handleConfirm}
                >
                  {attemptingTransaction ? (
                    <span>
                      Transaction Pending <CircularProgress size={16} className={classes.circularProgress} />
                    </span>
                  ) : Number(stakeAmount) === 0 ? (
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
                  {totalStaked} OVL
                </TEXT.BoldNumber>
              </div>
            </FlexRow>

            {/* My NIP rewards */}
            <FlexRow mt={16}>
              {/* Icon */}
              <div className={classes.iconBackground}>
                <Image src={OverlayLogoOnlyDark} alt={'Overlay Logo'} height={'32px'} width={'32px'} />
              </div>

              {/* Value */}
              <div>
                <TEXT.SmallBody color={'#C4C4C4'} mb={1}>
                  My NIP Rewards
                </TEXT.SmallBody>
                <TEXT.BoldNumber className={classes.totalStakedValue} fontSize={18} color={colors(true).dark.blue1} lineHeight={'24px'}>
                  {rewards} NIP
                </TEXT.BoldNumber>
              </div>
            </FlexRow>
            <Button className={classes.claimRewardsButton} disabled={rewards === 0} onClick={handleClaimRewards}>
              Claim
            </Button>
          </div>
        </div>
      </FlexRow>

      <Grid container spacing={8}>
        {powerCards.map((card, idx) => (
          <Grid item xs={12} md={4} justifyContent="center">
            <Card className={classes.powerCard}>
              {/* NIP cost */}
              <TEXT.BoldHeader1>{card.nipCost}</TEXT.BoldHeader1>

              {/* Image */}
              <Card className={classes.powerCardImageCard}>
                <CardMedia
                  component="img"
                  height="245"
                  image="https://image.lexica.art/full_jpg/0d28e99e-1a39-46d5-b9f4-bc8009a75a81"
                  title={card.name}
                  className={classes.powerCardImage}
                />
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
    </PageContainer>
  )
}

export default Pool
