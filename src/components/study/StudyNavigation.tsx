import { Variants } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowCircleLeftIcon from '../../assets/icons/ArrowCircleLeftIcon'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { nextStep, prevStep } from '../../redux/features'
import Button from '../input/Button'
import Iteration from './iteration/Iteration'
import Results from './results/Results'
import Settings from './settings/Settings'

const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.15,
        },
    },
}

interface StudyNavigationProps {}

const StudyNavigation: React.FC<StudyNavigationProps> = () => {
    const { currentStep, wordsToStudy, studyWay } = useAppSelector(
        (state) => state.study
    )

    const navigate = useNavigate()

    const [isVisibleIteration, setVisibleIteration] = React.useState(true)

    const dispatch = useAppDispatch()

    const goToNextStep = () => {
        setVisibleIteration(false)
        setTimeout(() => {
            dispatch(nextStep())
            setVisibleIteration(true)
        }, 200)
    }

    const goToPreviousStep = React.useCallback(() => {
        if(currentStep === 0) navigate(-1)
        setVisibleIteration(false)
        setTimeout(() => {
            dispatch(prevStep())
            setVisibleIteration(true)
        }, 200)
    }, [currentStep])

    return (
        <div className="h-full w-full flex items-center justify-center">
            {currentStep === 0 && (
                <Settings
                    variants={variants}
                    isVisible={isVisibleIteration}
                    goToNextStep={goToNextStep}
                />
            )}
            {currentStep > 0 && currentStep <= studyWay.length && (
                <Iteration
                    variants={variants}
                    goToNextStep={goToNextStep}
                    isVisible={isVisibleIteration}
                    name={wordsToStudy[studyWay[currentStep - 1]].name}
                    answer={wordsToStudy[studyWay[currentStep - 1]].translation}
                    id={wordsToStudy[studyWay[currentStep - 1]].id}
                />
            )}
            {currentStep > studyWay.length && (
                <Results isVisible={isVisibleIteration} variants={variants} />
            )}
            <div
                onClick={goToPreviousStep}
                className="absolute top-[50%] translate-y-[-50%] left-[15px] fill-white hover:fill-[#d1d4d6] transition-colors"
            >
                <ArrowCircleLeftIcon width="45px" height="45px" />
            </div>
        </div>
    )
}

export default StudyNavigation
