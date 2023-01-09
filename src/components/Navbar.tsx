import React from 'react'
import HomeIcon from './icons/HomeIcon'
import { useLocation } from 'react-router-dom';
import UsersIcon from './icons/UsersIcon';

const Navbar = () => {

    const {pathname} = useLocation()
    

    return (
        <div className="bg-secondaryBg w-[80px] h-[600px] shadow-primary fixed top-[40px] left-0 rounded-r-[12px]">
            <nav>
                <ul className='py-[15px]'>
                    <li className="w-full flex flex-col items-center pb-[20px] cursor-pointer">
                        <HomeIcon width= '45px' height='45px' color={pathname === '/' ? '#0D6CBD' : '#8FA0AF'} />
                    </li>
                    <li className="w-full flex flex-col items-center pb-[18px] cursor-pointer">
                        <UsersIcon width= '45px' height='45px' color={pathname === '/other' ? '#0D6CBD' : '#8FA0AF'} />
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
