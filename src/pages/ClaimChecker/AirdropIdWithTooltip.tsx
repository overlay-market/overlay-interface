import {FC, useEffect, useState} from 'react'
import {colors, MEDIA_WIDTHS} from '../../theme/theme'
import {Tooltip, withStyles, makeStyles} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'
import {useWindowDimensions} from '../../hooks/useWindowDimensions'
import {AirdropType} from '../../constants/claims'

const useStyles = makeStyles(() => ({
  customPosition: {
    position: 'relative',
    bottom: '10px',
  },
}))

const StyledTooltip = withStyles({
  tooltip: {
    width: 300,
    color: `${colors(false).dark.white}`,
    fontSize: '12px',
    backgroundColor: '#1B2131',
    border: '1px solid rgba(113, 206, 255, 0.5)',
    borderRadius: '8px',
    padding: '12px',
    fontFamily: 'Inter',
    boxSizing: 'border-box',
  },
})(Tooltip)

const TableHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 4px;
  color: ${colors(true).dark.grey2};
  font-family: Inter;
  :hover {
    color: ${colors(true).dark.blue1};
  }
`

const InfoCircleIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    {' '}
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />{' '}
    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />{' '}
  </svg>
)

interface Props {
  airdrop: AirdropType
}

const AirdropIdWithTooltip = ({airdrop}: Props) => {
  const classes = useStyles()
  const {width: widthScreen} = useWindowDimensions()

  const [isDesktop, setIsDesktop] = useState(widthScreen >= MEDIA_WIDTHS.minLarge)

  useEffect(() => {
    setIsDesktop(widthScreen >= MEDIA_WIDTHS.minLarge)
  }, [widthScreen])

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const tooltipContent = () => {
    return (
      <>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px'}}>
          <div style={{fontWeight: '700'}}>Expected airdrop date: {airdrop.expectedDate}</div>
          {!isDesktop && <CloseIcon fontSize="small" onClick={handleClose} />}
        </div>
        <div>{airdrop.summary}</div>
      </>
    )
  }

  return (
    <StyledTooltip
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      placement="bottom-end"
      interactive
      classes={{tooltip: classes.customPosition}}
      title={tooltipContent()}
    >
      <TableHeaderContent>
        {airdrop.title} (OVL)
        <InfoCircleIcon />
      </TableHeaderContent>
    </StyledTooltip>
  )
}

export default AirdropIdWithTooltip
