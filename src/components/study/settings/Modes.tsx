import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
// import { nextStep } from '../../redux/features'
import Mode from './Mode'
import { motion } from 'framer-motion'
import { setMode } from '../../../redux/features'
import { useNavigate } from 'react-router-dom'

interface ModesProps {
    goToNextStep: () => void
}

const Modes: React.FC<ModesProps> = ({ goToNextStep }) => {
    const modes = useAppSelector((state) => state.study.modes)

    const dispatch = useAppDispatch()
    const onSelectMode = (id: number) => {
        dispatch(setMode(id))
        goToNextStep()
    }

    return (
        <ul className="w-full flex flex-wrap items-center justify-center ">
            {modes.map((mode, index) => (
                <Mode
                    key={mode.id}
                    id={mode.id}
                    name={mode.name}
                    onClick={onSelectMode}
                />
            ))}
        </ul>
    )
}

export default Modes
