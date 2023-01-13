import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeviceTypeEnum } from '../../types'

type initialStateType = {
    deviceType: DeviceTypeEnum
    infoBlockData: null | {type: 'success' | 'error' | 'info', title?: string; text?: string }
    isInfoBlock: boolean
}

const initialState: initialStateType = {
    deviceType: DeviceTypeEnum.Mobile,
    infoBlockData: null,
    isInfoBlock: false,
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setDeviceType: (
            state,
            action: PayloadAction<{
                isMobile: boolean
                isTablet: boolean
                isDesktop: boolean
            }>
        ) => {
            if (action.payload.isMobile)
                state.deviceType = DeviceTypeEnum.Mobile
            else if (action.payload.isTablet)
                state.deviceType = DeviceTypeEnum.Tablet
            else if (action.payload.isDesktop)
                state.deviceType = DeviceTypeEnum.Desktop
        },
        openInfoBlock: (
            state,
            action: PayloadAction<{ title?: string; text?: string, type: 'success' | 'error' | 'info' }>
        ) => {
            state.infoBlockData = action.payload
            state.isInfoBlock = true
        },
        closeInfoBlock: (state) => {
            // state.infoBlockData = null
            state.isInfoBlock = false
        },
    },
})

export const { setDeviceType, openInfoBlock, closeInfoBlock } =
    appSlice.actions

export default appSlice.reducer
