import React from 'react'
import dictionaryLinesPictures from './../../images/dictionariesLine.png'
import dictionary1 from './../../images/preview/dictionaries/dictionary-1.png'
import { useScroll, motion, useTransform } from 'framer-motion'
import MyDictionary from '../myDictionaries/myDictionaries/MyDictionary'
import { useAppSelector } from '../../hooks/reduxHooks'

const numberOfDictionariesInLine = 6

const LineOfDictionaries = () => {
    const { scrollY } = useScroll()

    const containerRef = React.useRef<HTMLDivElement>(null)

    const deviceType = useAppSelector((state) => state.app.deviceType)

    const [containerTop, setContainerTop] = React.useState(0)
    const [containerBottom, setContainerBottom] = React.useState(0)

    React.useEffect(() => {
        const element = containerRef.current
        if (element != null) {
            setContainerTop(element.offsetTop)
            setContainerBottom(element.offsetTop + element.offsetHeight)
        }
    }, [containerRef])

    const rightLineX = useTransform(
        scrollY,
        [
            containerTop - window.innerHeight + 100,
            containerBottom + window.innerHeight - 160,
        ],
        [
            0,
            -1 *
                ((deviceType === 'Desktop' ? 430 : 180) *
                    numberOfDictionariesInLine -
                    window.innerWidth),
        ]
    )
    const leftLineX = useTransform(
        scrollY,
        [
            containerTop - window.innerHeight + 100,
            containerBottom + window.innerHeight / 2 - 160,
        ],
        [
            -1 *
                ((deviceType === 'Desktop' ? 430 : 180) *
                    numberOfDictionariesInLine -
                    window.innerWidth),
            0,
        ]
    )

    return (
        <section ref={containerRef} className="mb-[40px] lg:mb-[60px]">
            <motion.div style={{ x: rightLineX }} className="flex pb-[10px]">
                {Array.from({ length: numberOfDictionariesInLine }).map(
                    (item, index) => (
                        <MyDictionary
                            key={index}
                            name="Work"
                            words={10}
                            learnedWords={5}
                            access="public"
                            width={deviceType === 'Desktop' ? '410px' : '160px'}
                        />
                    )
                )}
            </motion.div>
            <motion.div style={{ x: leftLineX }} className="flex">
                {Array.from({ length: numberOfDictionariesInLine }).map(
                    (item, index) => (
                        <MyDictionary
                            key={index}
                            name="Work"
                            words={10}
                            learnedWords={5}
                            access="public"
                            width={deviceType === 'Desktop' ? '410px' : '160px'}
                        />
                    )
                )}
            </motion.div>
        </section>
    )
}

export default LineOfDictionaries
