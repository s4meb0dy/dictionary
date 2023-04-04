import { motion } from 'framer-motion'
import React from 'react'
import firstPerson from './../../images/preview/about/person-1.png'
import secondPerson from './../../images/preview/about/person-2.png'
import thirdPerson from './../../images/preview/about/person-3.png'
import fourthPerson from './../../images/preview/about/person-4.png'
import blueCard from './../../images/preview/about/blueCard.png'
import yellowCard from './../../images/preview/about/yellowCard.png'
import Button from '../input/Button'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'

const leftPersonVariants = {
    hidden: {
        opacity: 0,
        x: -50,
    },
    visible: () => ({
        opacity: 1,
        x: 0,
    }),
}

const rightPersonVariants = {
    hidden: {
        opacity: 0,
        x: 50,
    },
    visible: () => ({
        opacity: 1,
        x: 0,
    }),
}

const cardVariants = {
    hidden: {
        opacity: 0,
    },
    visible: () => ({
        opacity: 1,
    }),
}

const About = () => {
    const deviceType = useAppSelector((state) => state.app.deviceType)
    const navigate = useNavigate()
    return (
        <section className="max-w-[900px] m-auto">
            <div className="flex-col items-center lg:items-start lg:flex-row flex justify-between flex-wrap pb-[30px] lg:pb-[50px]">
                <motion.div className="lg:mr-[25px] mb-[30px] relative h-[350px] sm:h-[400px] w-[360px] sm:w-[425px] bg-white rounded-[15px] shadow-secondary">
                    <motion.img
                        variants={leftPersonVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3, once: true }}
                        src={firstPerson}
                        className="z-10 absolute bottom-[3px] left-[-8px] h-[300px] sm:h-[350px]"
                    />
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3, once: true }}
                        className="absolute top-[10px] sm:top-[17px] right-[10px] sm:right-[25px]"
                    >
                        <img
                            src={blueCard}
                            className="h-[290px] sm:h-[350px]"
                        />
                        <p className="absolute top-[8px] right-[10px] w-[152px] sm:w-[175px] text-[18px] sm:text-[24px] font-medium leading-tight tracking-tight">
                            You can create a dictionary and add words!
                        </p>
                    </motion.div>
                </motion.div>
                <div className="lg:ml-[25px] relative h-[350px] sm:h-[400px] w-[360px] sm:w-[425px] flex-auto bg-white rounded-[15px] shadow-secondary">
                    <motion.img
                        variants={rightPersonVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3, once: true }}
                        src={secondPerson}
                        className="z-10 absolute bottom-[0px] right-[2px] h-[300px] sm:h-[350px]"
                    />
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3, once: true }}
                        className="absolute top-[10px] sm:top-[17px] left-[10px] sm:left-[25px] "
                    >
                        <img
                            src={yellowCard}
                            className="h-[290px] sm:h-[350px]"
                        />
                        <p className="absolute top-[8px] left-[10px] w-[152px] sm:w-[175px] text-[18px] sm:text-[24px] font-medium leading-tight tracking-tight">
                            You can create a dictionary and add words!
                        </p>
                    </motion.div>
                </div>
            </div>
            <div className="flex justify-center items-center lg:block">
                <div className="bg-white h-[300px] w-[360px] sm:w-[425px] lg:w-auto rounded-[15px] shadow-secondary flex justify-center items-center relative">
                    <div className="flex flex-col items-center">
                        <motion.p
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3, once: true }}
                            className="text-[18px] sm:text-[25px] lg:text-[32px] font-medium tracking-tight leading-tight w-[300px] text-center pb-[20px]"
                        >
                            You can create a dictionary and add words!
                        </motion.p>
                        <Button
                            size={deviceType === 'Mobile' ? 'small' : 'medium'}
                            color="#0086EA"
                            hoverColor="#53A0FF"
                            activeColor="#0D6CBD"
                            onClick={() => navigate('/register')}
                        >
                            Get started
                        </Button>
                        {deviceType === 'Desktop' && (
                            <>
                                <motion.img
                                    variants={leftPersonVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ amount: 0.3, once: true }}
                                    src={thirdPerson}
                                    className="absolute bottom-0 left-[-17px] h-[335]"
                                />
                                <motion.img
                                    variants={rightPersonVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ amount: 0.3, once: true }}
                                    src={fourthPerson}
                                    className="absolute bottom-[-29px] right-0 h-[335px]"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
