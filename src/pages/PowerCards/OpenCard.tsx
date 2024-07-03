import {Box} from '@material-ui/core'
import styled from 'styled-components'
import {colors, TEXT} from '../../theme/theme'
import {Back} from '../../components/Back/Back'
import {ColorButton} from '../../components/Button/Button'
import {ExternalLink as ExternalLinkIcon} from 'react-feather'

const OpenCardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  @media (max-width: 764px) {
    display: flex;
    justify-content: center;
    background: ${() => colors(false).dark.grey4};

    &:first-child {
      margin-top: 8px;
      padding-top: 12px !important;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    &:last-child {
      padding-bottom: 12px !important;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    flex-direction: row !important;
    gap: 22px;
    
   `};
`
const ImageContainer = styled(Box)<{imgUrl: string}>`
  border-radius: 4px;
  aspect-ratio: 333/455;
  background: ${({imgUrl}) => `url(${imgUrl})`};
  background-size: cover;
  max-width: 501px;
  width: 50%;
`

const TextContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 50%;
  padding: 0px;
  ${({theme}) => theme.mediaWidth.minMedium`
  padding: 0px 24px;
  `};
`

const CardHeader = styled(Box)`
  display: flex;
  flex-direction: column;
`

const CardHeaderTitle = styled(Box)`
  // margin-top: -12px;
`

const CardDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
const CardDetailsBox = styled(Box)`
  display: flex;
  gap: 28px;
`
const CardDetailsTitle = styled(Box)`
  width: 57px;
`
const CardDetailsDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 290px;
`
const ButtonContent = styled(Box)`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

const OpenCard = () => {
  return (
    <OpenCardContainer>
      <ImageContainer imgUrl={'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'} />
      <TextContentContainer>
        <CardHeader>
          <Back arrowSize={16} fontSize={14} fontColor={colors(false).dark.blue2} toUrl={'/power-cards/all-cards'} />
          <CardHeaderTitle>
            <TEXT.StandardHeader1 fontSize={24}>Breeze of Mt Fuji</TEXT.StandardHeader1>
          </CardHeaderTitle>
        </CardHeader>
        <CardDetails>
          <CardDetailsBox>
            <CardDetailsTitle>
              <TEXT.BoldStandardBody>Stats</TEXT.BoldStandardBody>
            </CardDetailsTitle>
            <CardDetailsDescription>
              <TEXT.StandardBody>1/2000</TEXT.StandardBody>
              <TEXT.StandardBody>Max 10 OV payout</TEXT.StandardBody>
            </CardDetailsDescription>
          </CardDetailsBox>
          <CardDetailsBox>
            <CardDetailsTitle>
              <TEXT.BoldStandardBody>Powers</TEXT.BoldStandardBody>
            </CardDetailsTitle>
            <CardDetailsDescription>
              <TEXT.StandardBody>Negative fees, good for 1, 24 hour period of trading</TEXT.StandardBody>
            </CardDetailsDescription>
          </CardDetailsBox>
          <CardDetailsBox>
            <CardDetailsTitle>
              <TEXT.BoldStandardBody>Info</TEXT.BoldStandardBody>
            </CardDetailsTitle>
            <CardDetailsDescription>
              <TEXT.StandardBody>Step 1: Get this card</TEXT.StandardBody>
              <TEXT.StandardBody>Step 2: Burn this card</TEXT.StandardBody>
              <TEXT.StandardBody>Step 3: Trade for 24 hours</TEXT.StandardBody>
              <TEXT.StandardBody>Step 4: OV sent to you at the end of each month</TEXT.StandardBody>
            </CardDetailsDescription>
          </CardDetailsBox>
        </CardDetails>

        <ColorButton
          width={'258px'}
          height={'54px'}
          onClick={() => {
            console.log('Get this card!')
          }}
        >
          <ButtonContent>
            <TEXT.BoldStandardBody>Get this Power Card</TEXT.BoldStandardBody>
            <ExternalLinkIcon width={15} height={15} />
          </ButtonContent>
        </ColorButton>
      </TextContentContainer>
    </OpenCardContainer>
  )
}

export default OpenCard
