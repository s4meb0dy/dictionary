import React from "react"
import { Route, Routes } from "react-router-dom"
import AnimatedBg from "./components/animations/AnimatedBg"
import LoginPage from "./pages/LoginPage"
import Main from "./pages/Main"
import RegisterPage from "./pages/RegisterPage"

function App() {
    return (
        <div className='font-main h-full '>
            <AnimatedBg>
                <Routes>
                    <Route path='/*' element={<Main />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Routes>
            </AnimatedBg>
        </div>
    )
}

export default App
