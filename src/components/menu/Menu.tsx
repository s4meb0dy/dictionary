import React from 'react'
import './../../css/menu.css'
import MenuIcon from '../../assets/icons/MenuIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppSelector } from '../../hooks/reduxHooks'
import classNames from 'classnames'

const Menu = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="absolute top-[15px] right-[15px]">
            {/* <MenuIcon
                onClick={() => {
                    setIsOpen((prev) => !prev)
                }}
                width="32px"
                height="32px"
                color="#fff"
            /> */}
            <div
                onClick={() => {
                    setIsOpen((prev) => !prev)
                }}
                className="menu-button"
            >
                <span />
            </div>
            <DropDown isOpen={isOpen} />
        </div>
    )
}

const dropDownVariants = {
    hidden: {
        x: 95,
    },
    visible: () => ({
        x: 10,
        transition: { delay: 0.2 },
    }),
}

interface DropDownProps {
    isOpen: boolean
}

const DropDown: React.FC<DropDownProps> = ({ isOpen }) => {
    const colors = useAppSelector((state) => state.app.colors)
    const username = useAppSelector((state) => state.user.user?.username)

    const itemStyle = classNames(
        'pl-[15px] pr-[25px] text-textDark text-[14px]'
    )
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={dropDownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={`py-[15px] rounded-l-[12px] absolute top-[40px] right-[-15px] select-none`}
                    style={{ backgroundColor: colors.secondaryColor }}
                >
                    <ul className="w-max">
                        <li className={`${itemStyle} font-bold pb-[7px] `}>
                            {username}
                        </li>
                        <li
                            className={`${itemStyle} py-[3px] transition-colors hover:opacity-[0.5] cursor-pointer`}
                        >
                            Log out
                        </li>
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Menu
