import { access } from 'fs'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchMyDictionaries } from '../../redux/features/dictionarySlice'
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
        dispatch(fetchMyDictionaries())
        window.scrollTo(0, 0)
    }, [])

    const addDictionaryHandler = () => {
        navigate('/create-dictionary')
    }

    return (
        <div className="flex flex-wrap items-start justify-between">
            {!isLoading &&
                myDictionaries.dictionaries.length > 0 &&
                myDictionaries.dictionaries.map((item) => (
                    <MyDictionary
                        key={item.id}
                        name={item.name}
                        words={item.total}
                        learnedWords={item.learned}
                        id={item.id}
                        access={item.isPublic ? 'public' : 'private'}
                    />
                ))}
            {myDictionaries.dictionaries.length === 0 && isLoading && (
                <MyDictionaryLoader number={6} />
            )}
            {!isLoading && <AddDictionary onClick={addDictionaryHandler} />}
        </div>
    )
}

export default MyDictionaries
