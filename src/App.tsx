import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AnimatedBg from './components/animations/AnimatedBg'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import LoginPage from './pages/LoginPage'

import RegisterPage from './pages/RegisterPage'
import { fetchUserInfo } from './redux/features/userSlice'
import useMatchMedia from 'use-match-media-hook'
import { setDeviceType } from './redux/features/appSlice'
import Main from './pages/Main'

const queries = [
    '(max-width: 639px)',
    '(min-width: 640px) and (max-width: 1023px)',
    '(min-width: 1024px)',
]

function App() {
    const dispatch = useAppDispatch()

    const [isMobile, isTablet, isDesktop] = useMatchMedia(queries)

    React.useLayoutEffect(() => {
        dispatch(setDeviceType({ isMobile, isTablet, isDesktop }))
    }, [isMobile, isTablet, isDesktop])

    React.useEffect(() => {
        const token: string | null = localStorage.getItem('token')
        console.log(token)
        if (token) dispatch(fetchUserInfo())
    }, [])

    return (
        <div className="font-main h-full">
            <AnimatedBg>
                <Routes>
                    <Route path="/*" element={<Main />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </AnimatedBg>
        </div>
    )
}

export default App
