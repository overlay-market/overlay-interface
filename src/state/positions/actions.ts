import {createAction} from '@reduxjs/toolkit'

export const buildPosition = createAction<{isBuiltPosition: boolean}>('positions/buildPosition')
export const unwindPosition = createAction<{isUnwoundPosition: boolean}>('positions/unwindPosition')
export const closePositions = createAction<{areClosedPositions: boolean}>('positions/closePositions')
export const setNumberOfClosedPositions = createAction<{numberOfClosedPositions: number}>('positions/setNumberOfClosedPositions')
export const setNumberOfOpenPositions = createAction<{numberOfOpenPositions: number}>('positions/setNumberOfOpenPositions')
export const resetPositionsState = createAction<void>('positions/resetPositionsState')
