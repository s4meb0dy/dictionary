import { AnimatePresence, Variants, motion } from 'framer-motion'
import React from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'

interface ResultsProps {
    variants: Variants
    isVisible: boolean

}

const Results: React.FC<ResultsProps> = ({
    variants,
    isVisible,

}) => {
    const secondaryColor = useAppSelector(
        (state) => state.app.colors.secondaryColor
    )
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="w-full h-[500px] rounded-[25px] shadow-primary p-[30px] flex flex-col"
                    style={{ backgroundColor: secondaryColor }}
                >
                    Results
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Results
