import React from 'react'
import dictionaryLinesPictures from './../../images/dictionariesLine.png'
import dictionary1 from './../../images/preview/dictionaries/dictionary-1.png'
import {
    useScroll,
    motion,
    MotionValue,
    useTransform,
    useSpring,
    useViewportScroll,
} from 'framer-motion'

const LineOfDictionaries = () => {
    const { scrollY } = useScroll()

    const firstLineRef = React.useRef<HTMLDivElement>(null)
    const secondLineRef = React.useRef<HTMLDivElement>(null)

    const [firstLineTop, setFirstLineTop] = React.useState(0)
    const [firstLineBottom, setFirstLineBottom] = React.useState(0)
    const [secondLineTop, setSecondLineTop] = React.useState(0)
    const [secondLineBottom, setSecondLineBottom] = React.useState(0)

    React.useEffect(() => {
        const element = firstLineRef.current
        if (element != null) {
            setFirstLineTop(element.offsetTop)
            setFirstLineBottom(element.offsetTop + element.offsetHeight)
        }
    }, [firstLineRef])

    React.useEffect(() => {
        const element = secondLineRef.current
        if (element != null) {
            setSecondLineTop(element.offsetTop)
            setSecondLineBottom(element.offsetTop + element.offsetHeight)
        }
    }, [secondLineRef])

    const rightLineX = useTransform(
        scrollY,
        [
            firstLineTop - window.innerHeight,
            firstLineBottom + window.innerHeight,
        ],
        [0, -1 * (2990 - window.innerWidth)]
    )

    const leftLineX = useTransform(
        scrollY,
        [
            secondLineTop - window.innerHeight,
            secondLineBottom + window.innerHeight,
        ],
        [-1 * (2990 - window.innerWidth), 0]
    )

    return (
        <section className='pb-[60px]'>
            <motion.div
                ref={firstLineRef}
                style={{ x: rightLineX }}
                className="flex"
            >
                {Array.from({ length: 7 }).map((item, index) => (
                    <img
                        key={index + 'right'}
                        src={dictionary1}
                        className="h-[160px] mx-[7.5px] mb-[15px] shadow-secondary rounded-[15px]"
                    />
                ))}
            </motion.div>
            <motion.div
                ref={secondLineRef}
                style={{ x: leftLineX }}
                className="flex"
            >
                {Array.from({ length: 7 }).map((item, index) => (
                    <img
                        key={index + 'left'}
                        src={dictionary1}
                        className="h-[160px] mx-[7.5px] shadow-secondary rounded-[15px]"
                    />
                ))}
            </motion.div>
        </section>
    )
}

export default LineOfDictionaries
