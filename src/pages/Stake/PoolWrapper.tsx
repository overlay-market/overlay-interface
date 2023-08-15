import {PageContainer} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {Link, useHistory, RouteComponentProps} from 'react-router-dom'
import {ArrowLeft} from 'react-feather'
import {makeStyles} from '@material-ui/core/styles'
import {Fragment, useEffect, useState} from 'react'
import clsx from 'clsx'
import {colors} from '../../theme/theme'
import {PoolsData, allPoolsData} from '../../constants/stake'
import Stake from './Stake'
import LiquidityPool from './LiquidityPool'

const useStyles = makeStyles(theme => ({
  link: {
    color: '#71CEFF',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  backLink: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: 14,
  },
  arrowLeft: {
    verticalAlign: 'middle',
    paddingBottom: '2px',
  },
}))

const PoolWrapper = ({
  match: {
    params: {poolAddress},
  },
}: RouteComponentProps<{poolAddress: string}>) => {
  const classes = useStyles()
  const history = useHistory()
  const [poolData, setPoolData] = useState<PoolsData | null>(null)

  useEffect(() => {
    const pool = allPoolsData.find(pool => pool.poolAddress === poolAddress)

    if (!pool) {
      history.push('/stake')
    } else {
      setPoolData(pool)
    }
  }, [poolAddress, history])

  if (!poolData) return null

  return (
    <PageContainer>
      <Link to="/stake" className={clsx(classes.link, classes.backLink)}>
        <ArrowLeft strokeWidth={3} height={14} width={14} className={classes.arrowLeft} /> Back
      </Link>

      {poolData && (
        <Fragment>
          <TEXT.BoldStandardBody color={colors(true).dark.grey2} mt="26px" mb="8px">
            {poolData.poolName}
          </TEXT.BoldStandardBody>

          {poolData.isStake ? <Stake poolData={poolData} /> : <LiquidityPool poolData={poolData} />}
        </Fragment>
      )}
    </PageContainer>
  )
}

export default PoolWrapper
