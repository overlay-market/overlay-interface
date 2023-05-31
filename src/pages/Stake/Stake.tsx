import {FlexColumn, FlexRow, PageContainer} from '../../components/Container/Container'
import OverlayLogoOnlyDark from '../../assets/images/overlay-logo-only-no-background.png'
import {Image} from 'rebass'
import {TEXT} from '../../theme/theme'
import {Link} from 'react-router-dom'
import {ArrowRight} from 'react-feather'
import {makeStyles} from '@material-ui/core/styles'
import {SupportedChainId} from '../../constants/chains'
import {useState} from 'react'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'

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
    maxWidth: 400,
    flex: 1,
  },
  keyValueDisplay: {
    justifyContent: 'space-between',
  },
  rewardsValue: {
    fontFamily: 'Roboto Mono',
  },
  connectWallet: {
    textDecoration: 'underline',
  },
  emptyDiv: {
    flex: 1,
  },
  poolCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  toggleButtonGroup: {},
  toggleButton: {
    borderRadius: '37px',
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

const Stake = () => {
  const classes = useStyles()
  const [totalStaked, setTotalStaked] = useState<number>(0)
  const [poolType, setPoolType] = useState<string>('stake')

  const handlePoolTypeChange = (event: React.MouseEvent<HTMLElement>, newPoolType: string) => {
    setPoolType(newPoolType)
  }

  return (
    <PageContainer>
      <TEXT.BoldStandardBody color="grey2" mb="8px">
        {allPoolsData[0].poolName}
      </TEXT.BoldStandardBody>

      <FlexRow className={classes.flexRow}>
        <FlexColumn align="start">
          <TEXT.BoldHeader1 fontSize={24} lineHeight={'160%'} mb={0.5}>
            {allPoolsData[0].poolName}
          </TEXT.BoldHeader1>
          <TEXT.Supplemental color="grey2" lineHeight="15px" mb="3px">
            Rewards calculated by User Volume / Total Volume x Monthly Reward Pool
          </TEXT.Supplemental>
          <TEXT.Supplemental color="grey2" lineHeight="15px">
            Rewards airdropped first week of every month.{' '}
            <Link to="/" className={classes.link}>
              Learn more <ArrowRight height={12} width={12} className={classes.arrowRight} />
            </Link>
          </TEXT.Supplemental>
        </FlexColumn>

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

      <FlexRow mt={30} justifyContent="space-between">
        {/* Pool info */}
        <div className={classes.poolInfo}>
          <TEXT.BoldStandardBody>Providing OVL + USDC liquidity into this pool earns LP's OVL,</TEXT.BoldStandardBody>

          <TEXT.StandardBody>
            which can be used for purchase of Power Cards, Overlay Protocol's native Trading cards which give the owner special powers and rights,
            like FREE trading, Degen leverage levels, and extra voting power in Overlay governance.
          </TEXT.StandardBody>

          <FlexRow mt={32} className={classes.keyValueDisplay}>
            <TEXT.StandardBody color="grey2">Rewards</TEXT.StandardBody>

            <TEXT.StandardBody className={classes.rewardsValue}>1 NIP/100 OVL/1min</TEXT.StandardBody>
          </FlexRow>

          <FlexRow mt={24} className={classes.keyValueDisplay}>
            <TEXT.StandardBody color="grey2">My Balance</TEXT.StandardBody>

            <TEXT.StandardBody className={classes.connectWallet}>Connect Wallet</TEXT.StandardBody>
          </FlexRow>
        </div>

        {/* Pool card */}
        <div className={classes.poolCard}>
          {/* Toggle button */}
          <ToggleButtonGroup className={classes.toggleButtonGroup} value={poolType} onChange={handlePoolTypeChange} exclusive>
            <ToggleButton className={classes.toggleButton} value="stake">
              Stake
            </ToggleButton>
            <ToggleButton className={classes.toggleButton} value="withdraw">
              Withdraw
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Card */}
          <div></div>
        </div>

        {/* Empty div */}
        <div className={classes.emptyDiv}></div>
      </FlexRow>
    </PageContainer>
  )
}

export default Stake
