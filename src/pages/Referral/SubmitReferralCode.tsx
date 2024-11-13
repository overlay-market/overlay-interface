import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import {TEXT, colors} from '../../theme/theme'
import {darken, makeStyles} from '@material-ui/core/styles'
import {OutlinedInput} from '@material-ui/core'
import {TriggerActionButton} from '../../components/Button/Button'
import React, {useEffect, useState} from 'react'
import {useReferralCodeCallback} from '../../hooks/useReferralCode'
import {ethers} from 'ethers'
import styled from 'styled-components'
import {useActiveWeb3React} from '../../hooks/web3'
import {useWalletModalToggle} from '../../state/application/hooks'
import ReferralModal from './ReferralModal'
import {useReferralSignature} from '../../hooks/useReferralSignature'

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
  errorMessage: {
    alignSelf: 'flex-start',
    margin: '-15px 0 0 24px !important',
  },
}))

const ConnectWalletButton = styled(TriggerActionButton)`
  color: ${colors(false).dark.white};
  background: #53b1f9;
  width: 90%;
`

export const SubmitReferralCode = ({urlReferralCode}: {urlReferralCode: string | undefined}) => {
  const {account} = useActiveWeb3React()
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

  // const {callback: referralCodeCallback, error: errorMessage} = useReferralCodeCallback(referralLink)
  const {callback: referralCodeCallback, error: errorMessage} = useReferralSignature(referralLink)
  // TODO continue implementation

  const toggleWalletModal = useWalletModalToggle()

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
          transactionErrorMessage: error.message,
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
        <ReferralModal tier="affiliate" />
        <OutlinedInput
          error={validAddress || (transactionErrorMessage != undefined && !transactionErrorMessage.toString().includes('Transaction rejected'))}
          className={classes.referralInput}
          placeholder="Enter referral wallet address"
          onChange={e => setReferralLink(e.target.value)}
          value={referralLink}
        />
        {transactionErrorMessage != undefined && !transactionErrorMessage.toString().includes('Transaction rejected') && (
          <TEXT.Supplemental className={classes.errorMessage} color={colors(false).dark.red}>
            { transactionErrorMessage.toString() }
          </TEXT.Supplemental>
        )}
        {!account && <ConnectWalletButton onClick={toggleWalletModal}>Connect wallet</ConnectWalletButton>}
        {account && (
          <TriggerActionButton onClick={() => handleReferralCodeButton()} className={classes.referralButton}>
            Submit address
          </TriggerActionButton>
        )}
      </Box>
    </Container>
  )
}
