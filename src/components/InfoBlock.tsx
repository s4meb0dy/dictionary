import React from 'react'
import CircleCloseIcon from './icons/CircleCloseIcon'
import CloseIcon from './icons/CloseIcon'

type InfoBlockProps = {
    type: 'error' | 'success' | 'info'
    title?: string
    text?: string
}

const InfoBlock: React.FC<InfoBlockProps> = ({ type, title, text }) => {
    let colorBg: string

    switch (type) {
        case 'error':
            colorBg = '#FFECED'
            break
        case 'success':
            colorBg = '#C6FED0'
            break
        case 'info':
            colorBg = '#E8F2FE'
            break
    }

    return (
        <div className={`fixed bottom-[20px] right-[40px] z-50 text-textDark text-[14px] leading-[20px] rounded-[8px] px-[40px] py-[12px]`} style={{backgroundColor: colorBg}}>
            <div className="absolute top-[12px] left-[12px]">
                <CircleCloseIcon width="20px" height="20px" color="#FE2836" />
            </div>
            <div className="absolute top-[12px] right-[12px] cursor-pointer">
                <CloseIcon width="20px" height="20px" color="#616C76" />
            </div>

            {title && <h4 className="font-semibold text-[14px]">{title}</h4>}
            {text && <h4 className="text-[14px]">{text}</h4>}
        </div>
    )
}

export default InfoBlock
