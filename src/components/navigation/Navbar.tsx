import React from 'react'
import HomeIcon from '../../assets/icons/HomeIcon'
import { useLocation, useNavigate } from 'react-router-dom'
import FolderPlusIcon from '../../assets/icons/FolderPlusIcon'
import FolderUserIcon from '../../assets/icons/FolderUserIcon'
import { useAppSelector } from '../../hooks/reduxHooks'
import ArrowCircleLeftIcon from '../../assets/icons/ArrowCircleLeftIcon'
import classNames from 'classnames'
import { NavigationEnum } from '../../types/navigation'

const Navbar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { colors, deviceType } = useAppSelector((state) => state.app)

    const goToPrevPage = () => {
        if (pathname !== '/') navigate(-1)
    }

    const navStyles = classNames('z-50 shadow-primary fixed', {
        'bottom-0 left-0 w-full rounded-t-[12px]': deviceType !== 'Desktop',
        'w-[80px] top-[80px] left-0 rounded-r-[12px]': deviceType === 'Desktop',
    })

    const listStyles = classNames('', {
        'flex justify-center items-center px-[10px]': deviceType !== 'Desktop',
        'py-[15px]': deviceType === 'Desktop',
    })

    const itemStyles = classNames('cursor-pointer flex justify-center', {
        'px-[20px] py-[10px]': deviceType !== 'Desktop',
        'pb-[20px]': deviceType === 'Desktop',
    })

    return (
        <nav
            style={{ backgroundColor: colors.secondaryColor }}
            className={navStyles}
        >
            <ul className={listStyles}>
                <li className={itemStyles}>
                    <HomeIcon
                        onClick={() => navigate(NavigationEnum.myDictionaries)}
                        width="45px"
                        height="45px"
                        color={
                            pathname === NavigationEnum.myDictionaries
                                ? '#0D6CBD'
                                : '#8FA0AF'
                        }
                    />
                </li>
                <li className={itemStyles}>
                    <FolderPlusIcon
                        onClick={() =>
                            navigate(NavigationEnum.createDictionary)
                        }
                        width="45px"
                        height="45px"
                        color={
                            pathname === NavigationEnum.createDictionary
                                ? '#0D6CBD'
                                : '#8FA0AF'
                        }
                    />
                </li>
                <li className={itemStyles}>
                    <FolderUserIcon
                        onClick={() =>
                            navigate(NavigationEnum.publicDictionaries)
                        }
                        width="45px"
                        height="45px"
                        color={
                            pathname === NavigationEnum.publicDictionaries
                                ? '#0D6CBD'
                                : '#8FA0AF'
                        }
                    />
                </li>
                <li
                    className={` ${
                        deviceType !== 'Desktop'
                            ? 'px-[20px] py-[10px]'
                            : 'pt-[10px]'
                    } flex justify-center cursor-pointer fill-[#0D6CBD] hover:fill-[#0086EA] transition-colors`}
                >
                    <ArrowCircleLeftIcon
                        width="45px"
                        height="45px"
                        onClick={goToPrevPage}
                    />
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
