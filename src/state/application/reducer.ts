import {createReducer, nanoid} from '@reduxjs/toolkit'
import {
  updateChainId,
  updateBlockNumber,
  ApplicationModal,
  setOpenModal,
  PopupContent,
  addPopup,
  removePopup,
  updateTermsOfServiceStatus,
  UserTermsOfServiceStatus,
  setChainId,
} from './actions'
import {DEFAULT_CHAINID} from '../../constants/chains'

type PopupList = Array<{
  key: string
  show: boolean
  content: PopupContent
  removeAfterMs: number | null
}>
export interface ApplicationState {
  readonly chainId: number | null
  readonly popupList: PopupList
  readonly blockNumber: {readonly [chainId: number]: number}
  readonly openModal: ApplicationModal | null
  readonly termsOfServiceStatus: UserTermsOfServiceStatus
  readonly chainIdLocal: number | null
}

const initialState: ApplicationState = {
  chainId: 1,
  popupList: [],
  blockNumber: {},
  openModal: null,
  termsOfServiceStatus: UserTermsOfServiceStatus.NEW_USER,
  chainIdLocal: DEFAULT_CHAINID,
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateChainId, (state, action) => {
      const {chainId} = action.payload
      state.chainId = chainId
    })
    .addCase(updateBlockNumber, (state, action) => {
      const {chainId, blockNumber} = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload
    })
    .addCase(addPopup, (state, {payload: {content, key, removeAfterMs = 15000}}) => {
      state.popupList = (key ? state.popupList.filter(popup => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ])
    })
    .addCase(removePopup, (state, {payload: {key}}) => {
      state.popupList.forEach(p => {
        if (p.key === key) {
          p.show = false
        }
      })
    })
    .addCase(updateTermsOfServiceStatus, (state, action) => {
      state.termsOfServiceStatus = action.payload.termsOfServiceStatus
    })
    .addCase(setChainId, (state, action) => {
      const {chainId} = action.payload
      state.chainIdLocal = chainId
    }),
)
