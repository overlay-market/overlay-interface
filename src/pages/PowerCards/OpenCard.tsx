import {Box} from '@material-ui/core'
import styled from 'styled-components'
import {colors, TEXT} from '../../theme/theme'
import {Back} from '../../components/Back/Back'
import {ColorButton} from '../../components/Button/Button'
import {ExternalLink as ExternalLinkIcon} from 'react-feather'
import useIsMobile from '../../hooks/useIsMobile'

const OpenCardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0px 32px;
  @media (max-width: 767px) {
    width: 359px;
    background: ${() => colors(false).dark.grey4};
    border-radius: 4px;
    align-items: center;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    flex-direction: row !important;
    gap: 22px;
    padding: 0;
   `};
`
const ImageContainer = styled(Box)<{imgUrl: string}>`
  border-radius: 4px;
  aspect-ratio: 333/455;
  background: ${({imgUrl}) => `url(${imgUrl})`};
  background-size: cover;
  max-width: 333px;
  width: 100%;
  ${({theme}) => theme.mediaWidth.minSmall`
    width: 50%;
    max-width: 501px;    
  `};
`

const TextContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  gap: 24px;
  box-sizing: border-box;
  ${({theme}) => theme.mediaWidth.minSmall`
    width: 50%;
    padding: 0;
    align-items: start;
  `};
  ${({theme}) => theme.mediaWidth.minMedium`
  padding: 0px 24px;
  `};
`

const CardHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  ${({theme}) => theme.mediaWidth.minSmall`
    gap: 0;
    align-items: start;
  `};
`
const BackButton = styled(Box)`
  width: auto;
`

const CardDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
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
  const isMobile = useIsMobile()

  return (
    <Box>
      <OpenCardContainer>
        {isMobile && (
          <CardHeader>
            <BackButton>
              <Back arrowSize={16} fontSize={14} fontColor={colors(false).dark.blue2} toUrl={'/power-cards/all-cards'} />
            </BackButton>
            <TEXT.StandardHeader1 fontSize={24}>Breeze of Mt Fuji</TEXT.StandardHeader1>
          </CardHeader>
        )}
        <ImageContainer imgUrl={'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'} />
        <TextContentContainer>
          {!isMobile && (
            <CardHeader>
              <Back arrowSize={16} fontSize={14} fontColor={colors(false).dark.blue2} toUrl={'/power-cards/all-cards'} />
              <TEXT.StandardHeader1 fontSize={24}>Breeze of Mt Fuji</TEXT.StandardHeader1>
            </CardHeader>
          )}
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
    </Box>
  )
}

export default OpenCard
