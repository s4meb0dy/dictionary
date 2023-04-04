import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeContainer from '../Home/HomeContainer'
import Navbar from './Navbar'
import CreateDictionaryPage from '../../pages/myDictionary/CreateDictionaryPage'
import PublicDictionariesPage from '../../pages/publicDictionary/PublicDictionariesPage'
import DictionaryPage from '../../pages/myDictionary/MyDictionaryPage'
import PublicDictionaryPage from '../../pages/publicDictionary/PublicDictionaryPage'
import withAuth from '../../hoc/withAuth'
import StudyPage from '../../pages/study/StudyPage'

const CreateDictionaryPageContainer = withAuth(CreateDictionaryPage)
const DictionaryPageContainer = withAuth(DictionaryPage)
const StudyPageContainer = withAuth(StudyPage)
// const HomePageContainer = withRedirectToMain(MyDictionariesPage, HomePage)

const MainNavigation = () => {
    return (
        <div className="w-full min-h-screen">
            <Routes>
                <Route path="/" element={<HomeContainer />} />
                <Route
                    path="/create-dictionary"
                    element={
                        <>
                            <Navbar />
                            <CreateDictionaryPageContainer />
                        </>
                    }
                />
                <Route
                    path="/dictionaries"
                    element={
                        <>
                            <Navbar />
                            <PublicDictionariesPage />
                        </>
                    }
                />
                <Route
                    path="/my-dictionary/:id/:access/:name"
                    element={
                        <>
                            <Navbar />
                            <DictionaryPageContainer />
                        </>
                    }
                />
                <Route
                    path="/dictionary/:id/:name"
                    element={
                        <>
                            <Navbar />
                            <PublicDictionaryPage />
                        </>
                    }
                />
                <Route path="/learn/*" element={<StudyPageContainer />} />
            </Routes>
        </div>
    )
}

export default MainNavigation
