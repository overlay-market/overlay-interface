import {createAction} from '@reduxjs/toolkit'

export const buildPosition = createAction<{isBuiltPosition: boolean}>('positions/buildPosition')
export const resetPositionsState = createAction<void>('positions/resetPositionsState')
