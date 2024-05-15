import {configureStore} from '@reduxjs/toolkit'
import {save, load} from 'redux-localstorage-simple'
import user from './user/reducer'
import application from './application/reducer'
import multicall from './multicall/reducer'
import build from './build/reducer'
import bridge from './bridge/reducer'
import unwind from './unwind/reducer'
import transactions from './transactions/reducer'
import markets from './markets/reducer'
import stake from './stake/reducer'
import positions from './positions/reducer'
import {updateVersion} from './global/actions'
import {api as dataApi} from './data/slice'
import {setupListeners} from '@reduxjs/toolkit/query'

const PERSISTED_KEYS: string[] = ['user', 'transactions']

const store = configureStore({
  reducer: {
    application,
    user,
    multicall,
    build,
    bridge,
    unwind,
    transactions,
    markets,
    stake,
    positions,
    [dataApi.reducerPath]: dataApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: true})
      .concat(dataApi.middleware)
      .concat(save({states: PERSISTED_KEYS, debounce: 1000})),
  preloadedState: load({states: PERSISTED_KEYS}),
})

store.dispatch(updateVersion())

setupListeners(store.dispatch)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
