import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import myDictionaryImg from '../../images/home-my-dictionaries.png'
import Button from '../input/Button'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const secondaryColor = useAppSelector(
        (state) => state.app.colors.secondaryColor
    )

    const navigate = useNavigate()

    return (
        <header
            style={{
                backgroundColor: secondaryColor,
            }}
            className="w-full h-[65%] min-h-[550px] px-[120px] py-[75px] rounded-[40px] shadow-primary flex items-center justify-between"
        >
            <div className="h-full w-[50%] flex flex-col justify-between">
                <div>
                    <h1 className="text-black/90 tracking-tight font-bold text-[60px] pb-[5px]">
                        Your dictionary!
                    </h1>
                    <p className="text-black/50 text-[30px] font-medium w-[360px]">
                        Learn foreign words efficiently!
                    </p>
                </div>
                <div>
                    <Button
                        size="large"
                        styles="mb-[13px]"
                        color="#0086EA"
                        hoverColor="#53A0FF"
                        activeColor="#0D6CBD"
                        onClick={() => navigate('/register')}
                    >
                        Create account
                    </Button>
                    <Button
                        size="large"
                        color="#1D9745"
                        hoverColor="#24b553"
                        activeColor="#157b2f"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                </div>
            </div>
            <div className="h-full w-[50%]">
                <img
                    src={myDictionaryImg}
                    className="h-full w-full object-contain"
                    alt="img"
                />
            </div>
        </header>
    )
}

export default Header
