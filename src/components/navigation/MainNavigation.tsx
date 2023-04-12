import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateDictionaryPage from '../../pages/myDictionary/CreateDictionaryPage'
import PublicDictionariesPage from '../../pages/publicDictionary/PublicDictionariesPage'
import MyDictionaryPage from '../../pages/myDictionary/MyDictionaryPage'
import PublicDictionaryPage from '../../pages/publicDictionary/PublicDictionaryPage'
import withAuth from '../../hoc/withAuth'
import StudyPage from '../../pages/study/StudyPage'
import { NavigationEnum } from '../../types/navigation'
import PreviewPage from '../../pages/preview/PreviewPage'
import MyDictionariesPage from '../../pages/myDictionary/MyDictionariesPage'

const CreateDictionaryPageContainer = withAuth(CreateDictionaryPage)
const MyDictionaryPageContainer = withAuth(MyDictionaryPage)
const StudyPageContainer = withAuth(StudyPage)
const MyDictionariesPageContainer = withAuth(MyDictionariesPage)

const MainNavigation = () => {
    return (
        <div className="w-full min-h-screen">
            <Routes>
                <Route
                    path={NavigationEnum.preview}
                    element={<PreviewPage />}
                />
                <Route
                    path={NavigationEnum.myDictionaries}
                    element={<MyDictionariesPageContainer />}
                />

                <Route
                    path={NavigationEnum.createDictionary}
                    element={<CreateDictionaryPageContainer />}
                />
                <Route
                    path={NavigationEnum.myDictionary}
                    element={<MyDictionaryPageContainer />}
                />
                <Route
                    path={NavigationEnum.publicDictionaries}
                    element={<PublicDictionariesPage />}
                />
                <Route
                    path={NavigationEnum.publicDictionary}
                    element={<PublicDictionaryPage />}
                />
                <Route
                    path={NavigationEnum.study}
                    element={<StudyPageContainer />}
                />
            </Routes>
        </div>
    )
}

export default MainNavigation
