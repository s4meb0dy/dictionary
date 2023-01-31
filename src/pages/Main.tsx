import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomeContainer from '../components/Home/HomeContainer'

import Navbar from '../components/Navbar'
import { useAppSelector } from '../hooks/reduxHooks'
import CreateDictionaryPage from './CreateDictionaryPage'
import { AuthorizationEnum } from './../types/index'
import Home from './HomePage'
import AllDictionariesPage from './PublicDictionariesPage'
import Dictionary from './Dictionary'

const Main = () => {
    const authorizationStatus = useAppSelector(
        (state) => state.user.authorizationStatus
    )

    const navigate = useNavigate()

    React.useLayoutEffect(() => {
        if (authorizationStatus === AuthorizationEnum.Logout) navigate('/')
    }, [authorizationStatus])

    return (
        <div className="h-full">
            <Navbar />
            <div className="w-[900px] h-full mx-auto pt-[40px] ">
                <Routes>
                    <Route path="/" element={<HomeContainer />} />
                    <Route
                        path="/create-dictionary"
                        element={<CreateDictionaryPage />}
                    />
                    <Route
                        path="/dictionaries"
                        element={<AllDictionariesPage />}
                    />
                    <Route
                        path="/dictionary/:id/:access/:name"
                        element={<Dictionary />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default Main
