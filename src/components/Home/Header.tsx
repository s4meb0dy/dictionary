import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import myDictionaryImg from '../../images/home-my-dictionaries.png'
import Button from '../input/Button'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const navigate = useNavigate()

    const { colors, deviceType } = useAppSelector((state) => state.app)

    return (
        <header
            style={{ backgroundColor: colors.secondaryColor }}
            className="flex-none w-full flex items-center h-[70px] shadow-primary p-[10px]"
        >
            <div className="w-[900px] m-auto">
                <nav className="flex justify-between items-center">
                    <div>
                        <Link
                            to={'/dictionaries'}
                            style={{
                                color: 'black',
                                fontSize: '18px',
                                fontWeight: 500,
                            }}
                        >
                            Dictionaries
                        </Link>
                    </div>
                    <div className="flex">
                        <Button
                            size={deviceType === 'Mobile' ? 'small' : 'medium'}
                            styles="mr-[15px] sm:mr-[20px]"
                            color="#0086EA"
                            hoverColor="#53A0FF"
                            activeColor="#0D6CBD"
                            onClick={() => navigate('/register')}
                        >
                            Create account
                        </Button>
                        <Button
                            size={deviceType === 'Mobile' ? 'small' : 'medium'}
                            color="#1D9745"
                            hoverColor="#24b553"
                            activeColor="#157b2f"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header

{
    /* <Button
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
</Button> */
}

{
    /* <img
                    src={myDictionaryImg}
                    className="h-full w-full object-contain"
                    alt="img"
                /> */
}
