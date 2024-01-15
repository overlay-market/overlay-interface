import React, {Component, useState} from 'react'
import {PageContainer} from '../../components/Container/Container'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import {TEXT} from '../../theme/theme'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import {darken, makeStyles} from '@material-ui/core/styles'

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
}))

export const ReferralPage = () => {
  const classes = useStyles()
  const [poolType, setPoolType] = useState<string>('stake')

  const handlePoolTypeChange = (event: React.MouseEvent<HTMLElement>, newPoolType: string) => {
    if (newPoolType === null) return
    setPoolType(newPoolType)
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
          <TEXT.BoldHeader1 mb="32px">Referral</TEXT.BoldHeader1>
        </Box>
        <ToggleButtonGroup className={classes.toggleButtonGroup} value={poolType} onChange={handlePoolTypeChange} exclusive>
          <ToggleButton className={classes.toggleButton} value="stake" disableRipple>
            Traders
          </ToggleButton>
          <ToggleButton className={classes.toggleButton} value="withdraw" disableRipple>
            Affiliates
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Container>
  )
}
