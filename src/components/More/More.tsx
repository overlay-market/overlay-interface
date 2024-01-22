import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components/macro'
import {Link} from 'react-router-dom'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {MoreVertical, AlertCircle, Globe, ChevronLeft} from 'react-feather'
import {Fade, MenuItem, MenuList, Paper, Button, Popper, ClickAwayListener} from '@material-ui/core'
import {SupportedLocale, LOCALE_LABEL, SUPPORTED_LOCALES} from '../../constants/locales'
import {useActiveLocale} from '../../hooks/useActiveLocale'
import {FlexRow} from '../Container/Container'
import {MenuLink} from '../Link/Link'

export const IconContainer = styled(FlexRow)`
  width: auto;
  min-width: 16px;
`

export const StyledButton = styled(Button)`
  width: auto;
  min-width: 0px !important;
  padding: 6px 0 !important;
  display: none !important;

  ${({theme}) => theme.mediaWidth.minSmall`
    display: inline-flex !important;
  `};
`

export const StyledMenuList = styled(MenuList)`
  background: #373a44 !important;
  border-radius: 8px;
`

export const StyledPopper = styled(Popper)`
  z-index: 69 !important;
`

const BaseMenuItem = styled(MenuItem).attrs<{disableRipple: boolean}>(({disableRipple}) => ({
  disableRipple: disableRipple ?? true,
}))`
  display: flex;
  color: #fff !important;
  text-decoration: none !important;
  font-size: 14px !important;
  margin: 6px 6px !important;
  border-radius: 4px !important;
  line-height: 1 !important;
  min-width: 125px;

  :hover {
    background: #5f6067 !important;
  }
`

export const StyledMenuItem = styled(BaseMenuItem)`
  padding: 0px !important;
`

export const StyledMenuHeaderItem = styled(BaseMenuItem)`
  padding: 8px 16px 8px 8px !important;
`

export const StyledPaper = styled(Paper)`
  border-radius: 10px !important;
`

export const InternalMenuItem = styled(Link)<{fontFamily?: string}>`
  text-decoration: none;
  color: ${({theme}) => theme.dark.white};
  padding: 8px 16px 8px 12px;
  font-family: ${({fontFamily}) => (fontFamily ? fontFamily : 'default')};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
)
