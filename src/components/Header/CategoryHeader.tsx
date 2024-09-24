import React from 'react'
import styled from 'styled-components/macro'
import {CategoryName, MARKET_CATEGORIES, MarketCategoryMap} from '../../constants/markets'

const CategoryHeaderContainer = styled.div<{backgroundImage?: string}>`
  background-image: ${props => (props.backgroundImage ? `url(${props.backgroundImage})` : 'none')};
  background-size: cover;
  background-position: center;
  background-color: ${props => (props.backgroundImage ? 'transparent' : '#2a2a2a')};
  padding: 20px;
  margin: 20px 0 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`

const CategoryTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  position: relative;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`

const CategoryDescription = styled.p`
  font-size: 14px;
  color: #e0e0e0;
  margin: 5px 0 0;
  position: relative;
  z-index: 2;
`

interface CategoryHeaderProps {
  category: CategoryName
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({category}) => {
  const categoryDetails = MARKET_CATEGORIES[category as keyof MarketCategoryMap] || {}
  const {background, description} = categoryDetails

  return (
    <CategoryHeaderContainer backgroundImage={background}>
      <CategoryTitle>{category}</CategoryTitle>
      <CategoryDescription>{description || 'Explore these markets'}</CategoryDescription>
    </CategoryHeaderContainer>
  )
}

export default CategoryHeader
