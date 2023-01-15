import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeContainer from '../components/Home/HomeContainer'

import Navbar from '../components/Navbar'
import CreateDictionaryPage from './CreateDictionaryPage'

import Home from './HomePage'

const Main = () => {
    return (
        <div className="h-full">
            <Navbar />
            <div className='w-[900px] h-full mx-auto pt-[40px]'>
                <Routes>
                    <Route path="/" element={<HomeContainer />} />
                    <Route
                        path="/create-dictionary"
                        element={<CreateDictionaryPage />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default Main
