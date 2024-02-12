import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import {TEXT, colors} from '../../theme/theme'
import {darken, makeStyles} from '@material-ui/core/styles'
import {OutlinedInput} from '@material-ui/core'
import {TriggerActionButton} from '../../components/Button/Button'
import React, {useEffect, useState} from 'react'
import {useReferralCodeCallback} from '../../hooks/useReferralCode'
import {ethers} from 'ethers'

const useStyles = makeStyles(theme => ({
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
  toggleButtonGroup: {
    width: '90%',
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
  referralInput: {
    backgroundColor: '#474747',
    height: '54px',
    width: '90%',
    borderRadius: '8px',
    outline: 'none',
    color: 'white',
  },
  referralButton: {
    background: '#71CEFF',
    color: 'white',
    width: '90%',
  },
  lightBox: {
    borderRadius: '8px',
    boxShadow: '0px 0px 12px 6px rgba(91, 96, 164, 0.25)',
    border: '0.5px solid rgba(113, 206, 255, 0.5)',
    padding: '24px',
    gap: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    textAlign: 'center',
  },
}))

export const TraderPage = ({urlReferralCode}: {urlReferralCode: string | undefined}) => {
  const classes = useStyles()
  const [referralLink, setReferralLink] = useState(urlReferralCode ?? '')
  const [validAddress, setValidAddress] = useState(true)

  const [{showConfirm, attemptingTransaction, transactionErrorMessage, transactionHash}, setReferralCodeState] = useState<{
    showConfirm: boolean
    attemptingTransaction: boolean
    transactionErrorMessage: string | undefined | unknown
    transactionHash: string | undefined
  }>({
    showConfirm: false,
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  })

  useEffect(() => {
    ethers.utils.isAddress(referralLink) || referralLink.length === 0 ? setValidAddress(false) : setValidAddress(true)
  }, [referralLink])

  const {callback: referralCodeCallback} = useReferralCodeCallback(referralLink)

  const handleReferralCodeButton = () => {
    if (!referralCodeCallback) return
    setReferralCodeState({
      showConfirm: true,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    })
    referralCodeCallback()
      .then(hash => {
        setReferralCodeState({
          showConfirm: true,
          attemptingTransaction: true,
          transactionErrorMessage: undefined,
          transactionHash: hash,
        })
        setReferralCodeState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: hash,
        })
      })
      .catch(error => {
        setReferralCodeState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        })
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{marginTop: 20}}>
          <TEXT.BoldHeader1 mb="32px">Referrals</TEXT.BoldHeader1>
        </Box>
      </Box>
      <Box className={classes.lightBox}>
        <TEXT.BoldStandardBody>Rebates. Fee discounts.</TEXT.BoldStandardBody>
        <TEXT.StandardBody>
          Need mor info?{' '}
          <a href="/" style={{color: colors(false).dark.blue2}}>
            Overlay Referral Program &rarr;{' '}
          </a>
        </TEXT.StandardBody>
        <OutlinedInput
          error={validAddress}
          className={classes.referralInput}
          placeholder="Enter referral link"
          onChange={e => setReferralLink(e.target.value)}
          value={referralLink}
        />
        {/* <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        > */}
        <TriggerActionButton onClick={() => handleReferralCodeButton()} className={classes.referralButton}>
          Submit link
        </TriggerActionButton>
        {/* </Box> */}
      </Box>
    </Container>
  )
}
