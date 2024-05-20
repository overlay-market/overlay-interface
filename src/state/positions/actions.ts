import {createAction} from '@reduxjs/toolkit'

export const buildPosition = createAction<{isBuiltPosition: boolean}>('positions/buildPosition')
export const unwindPosition = createAction<{isUnwoundPosition: boolean}>('positions/unwindPosition')
export const closePositions = createAction<{areClosedPositions: boolean}>('positions/closePositions')
export const setNumberOfClosePositions = createAction<{numberOfClosedPositions: number}>('positions/setNumberOfClosePositions')
export const resetPositionsState = createAction<void>('positions/resetPositionsState')
