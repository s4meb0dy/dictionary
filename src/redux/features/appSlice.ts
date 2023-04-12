import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
    deviceType: 'Desktop' | 'Tablet' | 'Mobile'
    colors: {
        primaryColor: string
        secondaryColor: string
    }

    infoBlock: {
        infoBlockData: null | {
            type: 'success' | 'error' | 'info'
            title?: string
            text?: string
        }
        isInfoBlock: boolean
    }
}

const initialState: initialStateType = {
    deviceType: 'Mobile',
    colors: {
        primaryColor: 'var(--primary-color)',
        secondaryColor: 'var(--secondary-color)',
    },
    infoBlock: { infoBlockData: null, isInfoBlock: false },
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setBackgroundColor: (
            state,
            action: PayloadAction<'darkBlue' | 'blue'>
        ) => {
            if (action.payload === 'blue')
                state.colors.primaryColor = 'var(--primary-color)'
            else if (action.payload === 'darkBlue')
                state.colors.primaryColor = 'var(--dark-primary-color)'
        },
        setDeviceType: (
            state,
            action: PayloadAction<{
                isMobile: boolean
                isTablet: boolean
                isDesktop: boolean
            }>
        ) => {
            if (action.payload.isMobile) state.deviceType = 'Mobile'
            else if (action.payload.isTablet) state.deviceType = 'Tablet'
            else if (action.payload.isDesktop) state.deviceType = 'Desktop'
        },
        openInfoBlock: (
            state,
            action: PayloadAction<{
                title?: string
                text?: string
                type: 'success' | 'error' | 'info'
            }>
        ) => {
            state.infoBlock.infoBlockData = action.payload
            state.infoBlock.isInfoBlock = true
        },
        closeInfoBlock: (state) => {
            // state.infoBlockData = null
            state.infoBlock.isInfoBlock = false
        },
    },
})

export const {
    setDeviceType,
    openInfoBlock,
    closeInfoBlock,
    setBackgroundColor,
} = appSlice.actions

export default appSlice.reducer
