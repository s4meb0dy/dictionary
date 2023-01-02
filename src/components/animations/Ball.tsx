import React from 'react'

type BallProps = {
    width: string
    height: string
    styles?: string
}

const Ball: React.FC<BallProps> = ({ width, height, styles = '' }) => {
    return (
        <div
            style={{ width, height }}
            className={`rounded-full opacity-20 ${styles}`}
        />
    )
}

export default Ball
