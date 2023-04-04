import React from 'react'
import previewPicture from './../../images/iPhone.png'
import mockupPicture from './../../images/iPhone-mockup.png'
import backBgPicture from './../../images/backBg.png'
import dictionaryPicture from './../../images/mobile-open-dictionary.png'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppSelector } from '../../hooks/reduxHooks'
import classNames from 'classnames'

const title = [`Your`, 'dictionary!']

const titleVariants = {
    hidden: {
        opacity: 0,
        y: 15,
    },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.1 + 0.4 },
    }),
}

const imgVariants = {
    hidden: {
        y: 460,
    },
    visible: () => ({
        y: 30,
        transition: {
            duration: 1.2,
            delay: 1,
            type: 'spring',
            bounce: 0.3,
        },
    }),
}

const Preview = () => {
    const [isPictureInDisplay, setIsPictureInDisplay] = React.useState(false)
    const deviceType = useAppSelector((state) => state.app.deviceType)

    const containerStyles = classNames(
        'w-full flex-none flex flex-col justify-end items-center overflow-hidden',
        { 'h-[700px]': deviceType === 'Desktop' },
        { 'h-[600px]': deviceType !== 'Desktop' }
    )

    const mobileStyles = classNames(
        '-z-[5] relative',
        { 'h-[460px] w-auto': deviceType === 'Desktop' },
        { 'h-[400px] w-auto': deviceType !== 'Desktop' }
    )

    return (
        <div className={containerStyles}>
            <div className="flex flex-col items-center mb-[0px] -z-10">
                <h1 className="text-white text-[45px] lg:text-[55px] tracking-tight font-semibold">
                    {title.map((word, index) => (
                        <motion.span
                            key={word}
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index + 1}
                            className={`inline-block ${
                                title.length !== index + 1 ? 'pr-[10px]' : ''
                            }`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>
            </div>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={imgVariants}
                className={mobileStyles}
                onAnimationComplete={() => {
                    setIsPictureInDisplay(true)
                }}
            >
                <div
                    className={`absolute h-[96%] w-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0 flex`}
                >
                    <img
                        src={backBgPicture}
                        className="absolute w-full h-full object-contain transition-all"
                    />

                    <AnimatePresence>
                        {isPictureInDisplay && (
                            <motion.img
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                transition={{ duration: 0.15 }}
                                src={dictionaryPicture}
                                className="absolute h-full w-full object-contain transition-all animate-appearance"
                            />
                        )}
                    </AnimatePresence>
                </div>
                <img
                    src={mockupPicture}
                    className="relative h-full w-full object-contain z-20 block"
                />
            </motion.div>
        </div>
    )
}

export default Preview

{
    /* <h1 className='text-white text-[55px] tracking-tight font-semibold'>Your dictionary!</h1>
                <p className="text-white/50 text-[25px] font-medium w-[350px]">Learn foreign words efficiently!</p> */
}
