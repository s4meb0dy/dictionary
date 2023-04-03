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
    const { scrollYProgress } = useScroll()

    const containerRef = React.useRef(null)

    const [elementTop, setElementTop] = React.useState(0)
    const [elementBottom, setElementBottom] = React.useState(0)

    React.useEffect(() => {
        const element = containerRef.current
        if (element.center != null) {
            setElementTop(element.offsetTop)
            setElementBottom(element.offsetTop + element.offsetHeight)
        }
    }, [containerRef])

    const rightLineX = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -(2990 - window.innerWidth)]
    )

    const leftLineX = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 2990 - window.innerWidth]
    )

    console.log(window.innerWidth)

    return (
        <div
            ref={containerRef}
            className="h-[335px] flex flex-col justify-between"
        >
            <motion.div style={{ x: rightLineX }} className="flex">
                {Array.from({ length: 7 }).map((item, index) => (
                    <img
                        key={index + 'right'}
                        src={dictionary1}
                        className="h-[160px] mx-[7.5px] shadow-secondary rounded-[15px]"
                    />
                ))}
            </motion.div>
            <motion.div style={{ x: leftLineX }} className="flex">
                {Array.from({ length: 7 }).map((item, index) => (
                    <img
                        key={index + 'left'}
                        src={dictionary1}
                        className="h-[160px] mx-[7.5px] shadow-secondary rounded-[15px]"
                    />
                ))}
            </motion.div>
        </div>
    )
}

export default LineOfDictionaries
