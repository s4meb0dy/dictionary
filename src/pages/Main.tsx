import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomeContainer from '../components/Home/HomeContainer'
import Navbar from '../components/Navbar'
import { useAppSelector } from '../hooks/reduxHooks'
import CreateDictionaryPage from './CreateDictionaryPage'
import { AuthorizationEnum } from './../types/index'
import AllDictionariesPage from './PublicDictionariesPage'
import DictionaryPage from './DictionaryPage'
import PublicDictionaryPage from './PublicDictionaryPage'

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
                        path="/my-dictionary/:id/:access/:name"
                        element={<DictionaryPage />}
                    />
                    <Route
                        path="/dictionary/:id"
                        element={<PublicDictionaryPage />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default Main
