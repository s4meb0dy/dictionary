import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchDictionaries } from '../../redux/features/dictionarySlice'
import AddDictionary from './AddDictionary'
import MyDictionary from './MyDictionary'
import MyDictionaryLoader from './MyDictionaryLoader'

const MyDictionaries: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { myDictionaries, isLoading } = useAppSelector(
        (state) => state.dictionary
    )

    React.useEffect(() => {
        dispatch(fetchDictionaries())
    }, [])

    const addDictionaryHandler = () => {
        navigate('/create-dictionary')
    }

    const openDictionaryHandler = (id: number) => {
        navigate(`/dictionary/${id}`)
    }

    return (
        <div className="flex flex-wrap items-start justify-between">
            {!isLoading &&
                myDictionaries.length > 0 &&
                myDictionaries.map((item) => (
                    <MyDictionary
                        key={item.id}
                        name={item.name}
                        words={item.total}
                        learnedWords={item.learned}
                        id={item.id}
                        onClick={openDictionaryHandler}
                        access={item.isPublic ? 'public' : 'private'}
                    />
                ))}
            {isLoading && <MyDictionaryLoader number={6} />}
            {!isLoading && <AddDictionary onClick={addDictionaryHandler} />}
        </div>
    )
}

export default MyDictionaries
