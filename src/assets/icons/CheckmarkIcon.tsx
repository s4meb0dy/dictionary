import React from 'react'
import { IconTypes } from '../../types'

const Checkmark: React.FC<IconTypes> = ({ width, height, color }) => {
    return (
        <span>
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                fill={color}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.207 0.707078C11.5975 1.0976 11.5975 1.73077 11.207 2.12129L5.41406 7.91419C5.02354 8.30471 4.39037 8.30471 3.99985 7.91419L0.706956 4.62129C0.316431 4.23077 0.316431 3.5976 0.706956 3.20708C1.09748 2.81655 1.73064 2.81655 2.12117 3.20708L4.70696 5.79286L9.79274 0.707078C10.1833 0.316553 10.8164 0.316554 11.207 0.707078Z"
                />
            </svg>
        </span>
    )
}

export default Checkmark
