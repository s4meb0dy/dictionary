import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { closeInfoBlock } from '../../redux/features/appSlice'
import CheckCircleIcon from '../../assets/icons/CheckCircleIcon'
import CircleCloseIcon from '../../assets/icons/CircleCloseIcon'
import CloseIcon from '../../assets/icons/CloseIcon'
import { AnimatePresence, motion } from 'framer-motion'

const variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.05,
        },
    },
}

const InfoBlock: React.FC = () => {
    const dispatch = useAppDispatch()

    const isInfoBlock = useAppSelector(
        (state) => state.app.infoBlock.isInfoBlock
    )
    const infoBlockData = useAppSelector(
        (state) => state.app.infoBlock.infoBlockData
    )

    const [isHover, setIsHover] = React.useState<boolean>(false)
    const [colorBg, setColorBg] = React.useState<string>('#E8F2FE')

    const timerRef = React.useRef<NodeJS.Timeout | null>(null)

    const closeErrorHandler = () => {
        dispatch(closeInfoBlock())
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    const handleMouseOver = () => {
        setIsHover(true)
    }
    const handleMouseOut = () => {
        setIsHover(false)
    }

    React.useEffect(() => {
        if (isHover && timerRef.current) {
            timerRef.current && clearTimeout(timerRef.current)
            timerRef.current = null
        } else if (isInfoBlock && !isHover && !timerRef.current) {     
            timerRef.current = setTimeout(() => {
                dispatch(closeInfoBlock())
            }, 7000)
        }
    }, [isInfoBlock, isHover])

    React.useEffect(() => {
        if (infoBlockData) {
            switch (infoBlockData.type) {
                case 'error':
                    setColorBg('#FFECED')
                    break
                case 'success':
                    setColorBg('#C6FED0')
                    break
                case 'info':
                    setColorBg('#E8F2FE')
                    break
            }
        }
    }, [infoBlockData])

    return (
        <AnimatePresence>
            {isInfoBlock && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={`max-w-[400px] fixed bottom-[20px] right-[40px] z-50 text-textDark text-[14px] leading-[20px] rounded-[8px] px-[40px] py-[12px]`}
                    style={{
                        backgroundColor: colorBg,
                    }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    <div className="absolute top-[12px] left-[12px]">
                        {infoBlockData?.type === 'error' && (
                            <CircleCloseIcon
                                width="20px"
                                height="20px"
                                color="#FE2836"
                            />
                        )}
                        {infoBlockData?.type === 'success' && (
                            <CheckCircleIcon
                                width="20px"
                                height="20px"
                                color="#1D9745"
                            />
                        )}
                    </div>
                    <div
                        className="absolute top-[12px] right-[12px] cursor-pointer"
                        onClick={closeErrorHandler}
                    >
                        <CloseIcon width="20px" height="20px" color="#616C76" />
                    </div>

                    {infoBlockData?.title && (
                        <h4 className="font-semibold text-[14px]">
                            {infoBlockData.title}
                        </h4>
                    )}
                    {infoBlockData?.text && (
                        <h4 className="text-[14px] break-all w-full">
                            {infoBlockData.text}
                        </h4>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default InfoBlock
