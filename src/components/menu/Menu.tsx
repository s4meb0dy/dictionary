import React from 'react'
import './../../css/menu.css'
import MenuIcon from '../../assets/icons/MenuIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import classNames from 'classnames'
import { userApi } from '../../redux/services'
import useErrorHandler from '../../hooks/useErrorHandler'
import { openInfoBlock } from '../../redux/features'
import { getPreviewUrl } from '../../utils/navigateUrl'
import { useNavigate } from 'react-router-dom'

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
    const [logout, { isSuccess, error }] = userApi.useLogoutMutation()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    React.useEffect(() => {
        if (isSuccess) {
            console.log('yes')
            dispatch(
                openInfoBlock({
                    type: 'success',
                    title: 'Success',
                    text: 'You are logged out',
                })
            )
            // navigate(getPreviewUrl())
        }
    }, [isSuccess])


    useErrorHandler(error as string)


    const colors = useAppSelector((state) => state.app.colors)
    const username = useAppSelector(
        (state) => state.user.userData?.username
    )

    const itemStyle = classNames(
        'pl-[15px] pr-[25px] text-textDark text-[14px]'
    )

    const handleLogout = () => {
        logout()
    }

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
                        {username && (
                            <li className={`${itemStyle} font-bold pb-[7px] `}>
                                {username}
                            </li>
                        )}
                        <li
                            className={`${itemStyle} py-[3px] transition-colors hover:opacity-[0.5] cursor-pointer`}
                            onClick={handleLogout}
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
