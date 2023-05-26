import React from 'react'
import { IIcon } from '../../types/models'

const MenuIcon: React.FC<IIcon> = ({ width, height, color, onClick }) => {
    return (
        <span onClick={onClick}>
            <svg width={width}
                height={height} viewBox="0 0 32 32" fill={color}>
                <path fillRule="evenodd" clipRule="evenodd" d="M4 16C4 15.4477 4.44772 15 5 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H5C4.44772 17 4 16.5523 4 16Z"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M4 8C4 7.44772 4.44772 7 5 7H27C27.5523 7 28 7.44772 28 8C28 8.55228 27.5523 9 27 9H5C4.44772 9 4 8.55228 4 8Z"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M4 24C4 23.4477 4.44772 23 5 23H27C27.5523 23 28 23.4477 28 24C28 24.5523 27.5523 25 27 25H5C4.44772 25 4 24.5523 4 24Z"/>
            </svg>
        </span>
    )
}

export default MenuIcon
