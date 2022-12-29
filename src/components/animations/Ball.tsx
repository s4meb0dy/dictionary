import React from "react"

type BallProps = {
    width: string
    height: string
}

const Ball: React.FC<BallProps> = ({ width, height }) => {

    return (
        <div
            style={{ width, height }}
            className={`bg-gray rounded-full opacity-20`}
        />
    )
}

export default Ball
