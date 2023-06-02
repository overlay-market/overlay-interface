import {FlexColumn, FlexRow, PageContainer} from '../../components/Container/Container'
import {NumericalInput} from '../../components/NumericalInput/NumericalInput'
import {TriggerActionButton} from '../../components/Button/Button'
import OverlayLogoOnlyDark from '../../assets/images/overlay-logo-only-no-background.png'
import {Image} from 'rebass'
import {TEXT} from '../../theme/theme'
import {Link} from 'react-router-dom'
import {ArrowRight} from 'react-feather'
import {makeStyles} from '@material-ui/core/styles'
import {SupportedChainId} from '../../constants/chains'
import {useState} from 'react'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import {darken} from '@material-ui/core/styles'
import {useActiveWeb3React} from '../../hooks/web3'
import {useWalletModalToggle} from '../../state/application/hooks'

const useStyles = makeStyles(theme => ({
  flexRow: {
    alignItems: 'start',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  totalStakedCard: {
    display: 'flex',
    background: '#1B2131',
    border: '0.5px solid rgba(113, 206, 255, 0.5)',
    borderRadius: '8px',
    padding: '24px',
    alignItems: 'center',
    minWidth: '200px',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
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
  poolInfo: {
    flex: 1,
    maxWidth: 388,
    alignItems: 'flex-start',
  },
  keyValueDisplay: {
    justifyContent: 'space-between',
  },
  connectWallet: {
    textDecoration: 'underline',
  },
  poolCardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poolCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    border: '0.5px solid rgba(113, 206, 255, 0.5)',
    borderRadius: '8px',
    backgroud: '#1B2131',
    boxShadow: '0px 0px 12px 6px rgba(91, 96, 164, 0.2)',
    width: '310px',
    marginTop: '16px',
  },
  toggleButtonGroup: {
    '& .MuiToggleButtonGroup-groupedHorizontal:not(:first-child)': {
      marginLeft: '-10px',
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
    borderRadius: '8px',
    border: 'none',
    textTransform: 'none',
    padding: theme.spacing(2, 8),
    backgroundColor: '#474747',
    width: '175px',
    '& .MuiToggleButton-label': {
      color: '#F0F0F0',
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '17px',
    },
    '&:hover': {
      backgroundColor: darken('#474747', 0.1),
    },
    '&.Mui-selected': {
      zIndex: 1,
      backgroundColor: '#71CEFF',
      '& .MuiToggleButton-label': {
        color: '#202431',
      },
      '&:hover': {
        backgroundColor: darken('#71CEFF', 0.1),
      },
    },
  },
  inputContainer: {
    background: '#10131D',
    borderRadius: '8px',
    padding: '8px',
    marginTop: '8px',
  },
}))

export interface PoolsData {
  poolName: string
  poolAddress: string
  poolType: string
  chainId: number
}

const allPoolsData: PoolsData[] = [
  {
    poolName: 'Stake OVL for NIP',
    poolAddress: '0xf7c484e9dE1D7c8AAb098375AbCC52BA6d340A03',
    poolType: 'thirdwebStaking',
    chainId: SupportedChainId.ARBITRUM_GÖRLI,
  },
]

const Pool = () => {
  const classes = useStyles()
  const {account} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const [totalStaked, setTotalStaked] = useState<number>(0)
  const [poolType, setPoolType] = useState<string>('stake')
  const [stakeAmount, setStakeAmount] = useState<string>('0')

  const handlePoolTypeChange = (event: React.MouseEvent<HTMLElement>, newPoolType: string) => {
    if (newPoolType === null) return
    setPoolType(newPoolType)
  }

  const handleUserInput = (input: string) => {
    setStakeAmount(input)
  }

  return (
    <PageContainer>
      <TEXT.BoldStandardBody color="grey2" mb="8px">
        {allPoolsData[0].poolName}
      </TEXT.BoldStandardBody>

      <FlexRow className={classes.flexRow}>
        {/* Pool info */}
        <FlexColumn className={classes.poolInfo}>
          <TEXT.BoldHeader1 fontSize={24} lineHeight={'160%'} mb={0.5}>
            {allPoolsData[0].poolName}
          </TEXT.BoldHeader1>
          <TEXT.SmallBody color="grey2" lineHeight="17px" mb="13px">
            Rewards calculated by User Volume / Total Volume x Monthly Reward Pool
          </TEXT.SmallBody>
          <TEXT.SmallBody color="grey2" lineHeight="17px">
            Rewards airdropped first week of every month.
            <br />
            <Link to="/" className={classes.link}>
              Learn more <ArrowRight height={12} width={12} className={classes.arrowRight} />
            </Link>
          </TEXT.SmallBody>

          <div style={{marginTop: '46px'}}>
            <TEXT.SmallBody color="grey2" lineHeight="19px">
              Stakers of OVL into this pool earn rewards in the form of NIP (ERC-20). NIP can be exchanged for Power Cards, to exchange for OVL, and
              other cool things like swag.
              <br />
              <br />
            </TEXT.SmallBody>
            <TEXT.SmallBody color="grey2" lineHeight="19px">
              Overlay Protocol's native Power cards give the owner special powers like free trading, Degen leverage, and extra governance voting
              rights.
            </TEXT.SmallBody>

            <FlexRow mt={54} className={classes.keyValueDisplay}>
              <TEXT.StandardBody fontSize="14px" color="grey2">
                Rewards
              </TEXT.StandardBody>

              <TEXT.StandardBody fontSize="14px">1 NIP/100 OVL/1min</TEXT.StandardBody>
            </FlexRow>

            <FlexRow mt={24} className={classes.keyValueDisplay}>
              <FlexRow>
                <TEXT.StandardBody fontSize="14px" color="grey2">
                  Total Balance
                </TEXT.StandardBody>
                <TEXT.StandardBody fontSize="14px" color="grey2" fontWeight={700}>
                  Claim
                </TEXT.StandardBody>
              </FlexRow>

              <TEXT.StandardBody fontSize="14px">-</TEXT.StandardBody>
            </FlexRow>
          </div>
        </FlexColumn>

        {/* Pool card */}
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
            <TEXT.Supplemental color="grey2">Choose Staking Amount</TEXT.Supplemental>

            <div className={classes.inputContainer}>
              <FlexRow justify="space-between" mb="25px">
                <TEXT.Supplemental color="grey2">OVL Amount</TEXT.Supplemental>
                <TEXT.Supplemental color="grey2" style={{textDecoration: 'underline'}}>
                  Max: {'-'} OVL
                </TEXT.Supplemental>
              </FlexRow>
              <FlexRow justify="space-between">
                <NumericalInput color="#E5F6FF" align="left" padding="0px" fontWeight="700" value={stakeAmount} onUserInput={handleUserInput} />
                <TEXT.BoldStandardBody color="#E5F6FF">OVL</TEXT.BoldStandardBody>
              </FlexRow>
            </div>

            <FlexRow justify="space-between" mt="16px">
              <TEXT.Supplemental color="grey2">Est. Received APY</TEXT.Supplemental>
              <TEXT.Supplemental color="#E5F6FF">~40%</TEXT.Supplemental>
            </FlexRow>
          </div>
        </FlexColumn>

        {/* Total staked */}
        <div className={classes.totalStakedCard}>
          {/* Icon */}
          <div className={classes.iconBackground}>
            <Image src={OverlayLogoOnlyDark} alt={'Overlay Logo'} height={'32px'} width={'32px'} />
          </div>

          {/* Value */}
          <div>
            <TEXT.SmallBody color={'#C4C4C4'} mb={1}>
              Total Staked
            </TEXT.SmallBody>
            <TEXT.BoldNumber className={classes.totalStakedValue} fontSize={18} color={'#E5F6FF'} lineHeight={'24px'}>
              {totalStaked} OVL
            </TEXT.BoldNumber>
          </div>
        </div>
      </FlexRow>
    </PageContainer>
  )
}

export default Pool
