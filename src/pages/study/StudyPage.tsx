import React from 'react'
import StudyNavigation from '../../components/study/StudyNavigation'

import { useAppDispatch } from '../../hooks/reduxHooks'
import { clearStudyingSessionInfo } from '../../redux/features'

const StudyPage = () => {
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        return () => {
            dispatch(clearStudyingSessionInfo())
        }
    }, [])

    return (
        <div className="w-full max-w-[900px]  h-full mx-auto pt-[40px] animate-appearance pb-[40px]">
            <StudyNavigation />
        </div>
    )
}

export default StudyPage
