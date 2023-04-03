import React from 'react'
import previewPicture from './../../images/iPhone.png'
import mockupPicture from './../../images/iPhone-mockup.png'
import backBgPicture from './../../images/backBg.png'
import dictionaryPicture from './../../images/mobile-open-dictionary.png'
import { AnimatePresence, motion } from 'framer-motion'

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

    return (
        <div className="w-full flex-none h-[700px] flex flex-col justify-end items-center overflow-hidden">
            <div className="flex flex-col items-center mb-[0px] -z-10">
                <h1 className="text-white text-[55px] tracking-tight font-semibold">
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
                className="h-[460px] -z-[5] relative"
                onAnimationComplete={() => {
                    setIsPictureInDisplay(true)
                }}
            >
                <div
                    className={`absolute h-full w-[201px] top-[14px] left-[18px] z-0`}
                >
                    <img
                        src={backBgPicture}
                        className="absolute w-full transition-all"
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
                                className="absolute w-full transition-all animate-appearance"
                            />
                        )}
                    </AnimatePresence>
                </div>
                <img
                    src={mockupPicture}
                    className="relative h-full z-20 block"
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
