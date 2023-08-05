import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'
import {MouseEventHandler, useEffect, useRef, useState} from 'react'
import Loader from '../../components/Loaders/Loaders'
import {RotatingChevron} from '../Header/Header'

const DropdownContainer = styled.div<{active: boolean}>`
  display: none;
  flex-direction: column;
  position: relative;
  text-decoration: none;
  padding: 8px 0 8px 8px;
  cursor: pointer;

  border-radius: 8px;
  transition: width 0.2 ease-in-out;

  .dropdown-list {
    padding: 0;
    border-radius: 8px;
    width: 59px;
    height: 0px;

    a {
      display: none;
    }
  }

  .chevron {
    transform: rotate(0deg);
  }

  ${({active, theme}) =>
    active
      ? `
        background: ${theme.dark.grey5};
        border-radius: 8px 8px 0 0;
        width: 100px;

        .chevron {
          transform: rotate(180deg);
        }

        .dropdown-list {
          border-radius: 0 0 8px 8px;
          width: 108px;
          height: auto;
          padding-bottom: 8px;

          a {
            display: flex;
          }
        }`
      : ''}

  ${({theme}) => theme.mediaWidth.minSmall`
    display: flex;
  `};
`

const DropdownContent = styled.div`
  display: flex;
  gap: 4px;
`

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.dark.grey5};
  overflow: hidden;
  transition: width 0.2 ease-in-out;
  max-height: 160px;
  overflow-y: scroll;
  padding: 0;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(229, 246, 255, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  }
`

const DropdownItem = styled.div`
  padding: 8px 16px 8px 8px;
`

interface IOption {
  value?: string
  label?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

const Dropdown = ({value, options, isLoading}: {value?: IOption; options: IOption[]; isLoading?: boolean}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <DropdownContainer ref={dropdownRef} onClick={() => setIsDropdownOpen(!isDropdownOpen)} active={isDropdownOpen}>
      <DropdownContent>
        <TEXT.SmallBody color={colors(false).dark.white}>
          {isLoading ? <Loader size="12px" /> : value?.label ? value?.label : value?.value}
        </TEXT.SmallBody>
        <RotatingChevron color={colors(false).dark.white} className="chevron" height={17} width={17} />
      </DropdownContent>
      <DropdownList className="dropdown-list">
        {options.map((option: IOption) => (
          <DropdownItem onClick={option.onClick}>
            <TEXT.SmallBody>{option?.label}</TEXT.SmallBody>
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  )
}

export default Dropdown
