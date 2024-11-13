import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {Box} from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const Container = styled.div<{isLeaderboardCard?: boolean}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  width: 100%;
  background: #171926;
  border-radius: 8px;
  padding: 20px 24px;
`

const PercentageChangeBox = styled.div<{positive: boolean}>`
  padding: 4px;
  border-radius: 5px;
  background: ${({positive}) => (positive ? 'rgba(95, 208, 171, 0.20)' : 'rgba(255, 100, 138, 0.20)')};
`

const BoldHeader1 = styled(TEXT.BoldHeader1)`
  font-size: 16px !important;
  ${({theme}) => theme.mediaWidth.minMedium`
    font-size: 20px !important;
  `}

  ${({theme}) => theme.mediaWidth.minExtraSmall`
    padding: 24px;
    padding: 4px 0px;
    flex-direction: row;
  `};
`

interface DataProps {
  title: string
  value: string | number | null
  valueType: string | null
  percentageChange?: number | null
  period?: string
  isOver1000OpenPositions?: boolean
  isLeaderboardCard?: boolean
  valueTypeLink?: boolean
  button?: () => void
  buttonText?: string
  showModal?: (showModalTrigger: boolean) => void
  tooltip?: string
  hasClaimableReward?: boolean
}

const OverviewCard = (props: DataProps) => {
  const {
    title,
    value,
    valueType,
    percentageChange,
    period,
    isOver1000OpenPositions,
    valueTypeLink,
    button,
    buttonText,
    showModal,
    tooltip,
    hasClaimableReward,
  } = props

  const copyText = () => {
    if (navigator.clipboard && value) {
      navigator.clipboard.writeText(value.toString())
    }
  }

  return (
    <>
      <Container>
        <TEXT.SmallBody fontSize={14} color="#c4c4c4">
          {title}
        </TEXT.SmallBody>
        {isOver1000OpenPositions && (
          <Box mt="4px">
            <TEXT.Supplemental style={{whiteSpace: 'nowrap'}} fontSize={10} color={colors(true).dark.red}>
              Open Positions {'>'} 1000
            </TEXT.Supplemental>
            <TEXT.Supplemental style={{whiteSpace: 'nowrap'}} fontSize={10} color={colors(true).dark.red}>
              May output wrong value
            </TEXT.Supplemental>
          </Box>
        )}
        {!value ? (
          <TEXT.SmallBody color="#c4c4c4" style={{whiteSpace: 'nowrap'}} mb={12}>
            No data
          </TEXT.SmallBody>
        ) : (
          <BoldHeader1 style={{whiteSpace: 'nowrap', marginTop: '15px', overflow: 'hidden', textOverflow: 'ellipsis'}} mb={12}>
            {value}
          </BoldHeader1>
        )}
        <Box display="flex" alignItems="center">
          {!valueType ? (
            <Box mt={'18px'}></Box>
          ) : (
            <TEXT.SmallBody fontSize={14} color="#c4c4c4">
              {valueTypeLink ? (
                <a
                  onClick={valueType === 'Copy link ->' ? () => copyText() : () => showModal && showModal(true)}
                  target="_blank"
                  style={{color: colors(false).dark.blue2, cursor: 'pointer'}}
                >
                  {valueType}
                </a>
              ) : (
                <span>{valueType}</span>
              )}
            </TEXT.SmallBody>
          )}

          <Box display="flex" alignItems="center" marginLeft="auto">
            {value && !!percentageChange && (
              <PercentageChangeBox positive={percentageChange > 0}>
                <TEXT.Number color={percentageChange > 0 ? '#5FD0AB' : '#FF648A'}>
                  {percentageChange > 0 && '+'}
                  {percentageChange}%
                </TEXT.Number>
              </PercentageChangeBox>
            )}
            {value && !!percentageChange && !button && (
              <TEXT.Supplemental color="#c4c4c4" ml={1}>
                {period}
              </TEXT.Supplemental>
            )}
            {buttonText && (
              <div>
                <Tooltip title={tooltip || ''} placement="top">
                  <Box
                    ml={1}
                    onClick={hasClaimableReward ? button : undefined}
                    style={{color: hasClaimableReward ? colors(false).dark.blue2 : '#c4c4c4', cursor: hasClaimableReward ? 'pointer' : ''}}
                    fontFamily="Inter, sans-serif"
                    fontSize={12}
                    fontWeight={400}
                    color={colors(false).dark.white}
                  >
                    {buttonText}
                  </Box>
                </Tooltip>
              </div>
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default OverviewCard
