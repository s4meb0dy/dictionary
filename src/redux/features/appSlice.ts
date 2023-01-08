import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeviceTypeEnum } from '../../types'

type initialStateType = {
    deviceType: DeviceTypeEnum
}

const initialState: initialStateType = {
    deviceType: DeviceTypeEnum.Mobile,
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
    },
})

export const { setDeviceType } = appSlice.actions

export default appSlice.reducer
