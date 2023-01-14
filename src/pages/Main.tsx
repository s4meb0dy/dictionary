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
            <Routes>
                <Route path="/" element={<HomeContainer />} />
                <Route
                    path="/create-dictionary"
                    element={<CreateDictionaryPage />}
                />
            </Routes>
        </div>
    )
}

export default Main
