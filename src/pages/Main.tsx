import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeContainer from '../components/Home/HomeContainer'
import Navbar from '../components/navigation/Navbar'
import { useAppSelector } from '../hooks/reduxHooks'
import CreateDictionaryPage from './myDictionary/CreateDictionaryPage'
import { AuthorizationEnum } from './../types/index'
import PublicDictionariesPage from './publicDictionary/PublicDictionariesPage'
import DictionaryPage from './myDictionary/MyDictionaryPage'
import PublicDictionaryPage from './publicDictionary/PublicDictionaryPage'
import withAuth from '../hoc/withAuth'




const CreateDictionaryPageContainer = withAuth(CreateDictionaryPage)
const DictionaryPageContainer = withAuth(DictionaryPage)
// const HomePageContainer = withRedirectToMain(MyDictionariesPage, HomePage)


const Main = () => {
    const authorizationStatus = useAppSelector(
        (state) => state.user.authorizationStatus
    )


    return (
        <div className="h-full">
            {authorizationStatus === AuthorizationEnum.Login && <Navbar />}
    

            <div className="w-[900px] h-full mx-auto pt-[40px] ">
                <Routes>
                    <Route path="/" element={<HomeContainer />} />
                    <Route
                        path="/create-dictionary"
                        element={<CreateDictionaryPageContainer />}
                    />

                    <Route
                        path="/dictionaries"
                        element={<PublicDictionariesPage />}
                    />
                    <Route
                        path="/my-dictionary/:id/:access/:name"
                        element={<DictionaryPageContainer />}
                    />
                    <Route
                        path="/dictionary/:id/:name"
                        element={<PublicDictionaryPage />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default Main
