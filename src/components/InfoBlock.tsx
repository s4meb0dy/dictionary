import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { closeInfoBlock } from '../redux/features/appSlice'
import CircleCloseIcon from './icons/CircleCloseIcon'
import CloseIcon from './icons/CloseIcon'

type InfoBlockProps = {}

const InfoBlock: React.FC<InfoBlockProps> = () => {
    const dispatch = useAppDispatch()

    const isInfoBlock = useAppSelector((state) => state.app.isInfoBlock)
    const infoBlockData = useAppSelector((state) => state.app.infoBlockData)

    const [isActive, setIsActive] = React.useState<boolean>(false)
    const [colorBg, setColorBg] = React.useState<string>('#E8F2FE')

    const closeErrorHandler = () => {
        dispatch(closeInfoBlock())
    }

    React.useEffect(() => {
        if (isInfoBlock) {
            setIsActive(true)
            setTimeout(() => {
                dispatch(closeInfoBlock())
            }, 7000)
        } else setIsActive(false)
    }, [isInfoBlock])

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
        <div
            className={`fixed bottom-[20px] right-[40px] z-50 text-textDark text-[14px] leading-[20px] rounded-[8px] px-[40px] py-[12px] transition-opacity select-none`}
            style={{
                backgroundColor: colorBg,
                opacity: isActive ? '1' : '0',
                pointerEvents: isActive ? 'all' : 'none',
                // transition: 'all 1s'
            }}
        >
            <div className="absolute top-[12px] left-[12px]">
                {
                    infoBlockData?.type == 'error' && <CircleCloseIcon width="20px" height="20px" color="#FE2836" />
                }
                {
                    infoBlockData?.type == 'success' && <CircleCloseIcon width="20px" height="20px" color="#1D9745" />
                }         
            </div>
            <div className="absolute top-[12px] right-[12px] cursor-pointer" onClick={closeErrorHandler}>
                <CloseIcon width="20px" height="20px" color="#616C76" />
            </div>

            {infoBlockData?.title && (
                <h4 className="font-semibold text-[14px]">
                    {infoBlockData.title}
                </h4>
            )}
            {infoBlockData?.text && (
                <h4 className="text-[14px]">{infoBlockData.text}</h4>
            )}
        </div>
    )
}

export default InfoBlock
