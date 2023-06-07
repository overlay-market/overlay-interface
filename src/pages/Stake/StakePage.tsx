import {FlexColumn, FlexRow, PageContainer} from '../../components/Container/Container'
import OverlayLogoOnlyDark from '../../assets/images/overlay-logo-only-no-background.png'
import {Image} from 'rebass'
import {TEXT} from '../../theme/theme'
import {Link} from 'react-router-dom'
import {ArrowRight} from 'react-feather'
import Pools from './Pools'
import {makeStyles} from '@material-ui/core/styles'
import {useAppSelector} from '../../state/hooks'
import {AppState} from '../../state/state'
import {useEffect, useState} from 'react'
import {colors} from '../../theme/theme'
import {PoolsData, allPoolsData} from '../../constants/stake'

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
}))

const StakePage = () => {
  const classes = useStyles()

  let chainId = useAppSelector((state: AppState) => state.application.chainId)
  const [filteredPoolsData, setFilteredPoolsData] = useState<PoolsData[]>([])
  const [totalStaked, setTotalStaked] = useState<number>(0)
  let poolTvls: number[] = []

  useEffect(() => {
    setFilteredPoolsData(allPoolsData.filter(pool => pool.chainId === chainId))
  }, [chainId])

  function addToTotalStaked(amount: number, index: number) {
    poolTvls[index] = amount
    setTotalStaked(poolTvls.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
  }

  return (
    <PageContainer>
      <TEXT.BoldStandardBody color={colors(true).dark.grey2} mb="8px">
        All Staking
      </TEXT.BoldStandardBody>

      <FlexRow className={classes.flexRow}>
        <FlexColumn align="start">
          <TEXT.BoldHeader1 fontSize={24} lineHeight={'160%'} mb="2px">
            Stake OVL, Earn Rewards
          </TEXT.BoldHeader1>
          <TEXT.SmallBody color={colors(true).dark.grey2} mb="1px">
            Rewards calculated by User Volume / Total Volume x Monthly Reward Pool
          </TEXT.SmallBody>
          <TEXT.SmallBody color={colors(true).dark.grey2}>
            Rewards airdropped first week of every month.{' '}
            <Link to="/" className={classes.link}>
              Learn more <ArrowRight height={14} width={14} className={classes.arrowRight} />
            </Link>
          </TEXT.SmallBody>
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
            <TEXT.BoldNumber className={classes.totalStakedValue} fontSize={18} color={colors(true).dark.blue1}>
              {totalStaked} OVL
            </TEXT.BoldNumber>
          </div>
        </div>
      </FlexRow>

      <Pools filteredPoolsData={filteredPoolsData} addToTotalStaked={addToTotalStaked} />
    </PageContainer>
  )
}

export default StakePage
