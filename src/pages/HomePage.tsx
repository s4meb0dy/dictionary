import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddDictionary from '../components/Home/AddDictionary'
import Information from '../components/Home/Information'
import MyDictionaries from '../components/Home/MyDictionaries'
import { useAppDispatch } from '../hooks/reduxHooks'
import { fetchDictionaries } from '../redux/features/dictionarySlice'

const HomePage = () => {

    return (
        <div className="h-full w-full animate-appearance">
            <Information />
            <MyDictionaries />
        </div>
    )
}

export default HomePage
