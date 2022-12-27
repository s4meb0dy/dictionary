import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Main from "./pages/Main"
import RegisterPage from "./pages/RegisterPage"

function App() {
    return (
        <div className='font-main min-h-[100%]'>
            <Routes>
                <Route path='/*' element={<Main />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </div>
    )
}

export default App
