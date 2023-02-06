import React from 'react'
import HomeIcon from '../assets/icons/HomeIcon'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import UsersIcon from '../assets/icons/UsersIcon'
import FolderPlusIcon from '../assets/icons/FolderPlusIcon'
import FolderUserIcon from '../assets/icons/FolderUserIcon'

const Navbar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const onNavigateHandler = (link: string) => {
        navigate(link)
    }

    return (
        <div className="bg-secondaryBg z-50 w-[80px] h-[600px] shadow-primary fixed top-[40px] left-0 rounded-r-[12px]">
            <nav>
                <ul className="py-[15px]">
                    <li
                        className="w-full flex flex-col items-center pb-[20px] cursor-pointer"
                        onClick={() => onNavigateHandler('/')}
                    >
                        <HomeIcon
                            width="45px"
                            height="45px"
                            color={pathname === '/' ? '#0D6CBD' : '#8FA0AF'}
                        />
                    </li>
                    <li
                        className="w-full flex flex-col items-center pb-[18px] cursor-pointer"
                        onClick={() => onNavigateHandler('/create-dictionary')}
                    >
                        <FolderPlusIcon
                            width="45px"
                            height="45px"
                            color={
                                pathname === '/create-dictionary'
                                    ? '#0D6CBD'
                                    : '#8FA0AF'
                            }
                        />
                    </li>
                    <li
                        className="w-full flex flex-col items-center pb-[18px] cursor-pointer"
                        onClick={() => onNavigateHandler('/dictionaries')}
                    >
                        <FolderUserIcon
                            width="45px"
                            height="45px"
                            color={
                                pathname === '/dictionaries'
                                    ? '#0D6CBD'
                                    : '#8FA0AF'
                            }
                        />
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
