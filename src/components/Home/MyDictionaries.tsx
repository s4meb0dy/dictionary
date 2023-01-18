import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchDictionaries } from '../../redux/features/dictionarySlice'
import AddDictionary from './AddDictionary'
import MyDictionary from './MyDictionary'

const MyDictionaries: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const dictionaries = useAppSelector(
        (state) => state.dictionary.myDictionaries
    )

    React.useEffect(() => {
        dispatch(fetchDictionaries())
    }, [])

    const addDictionaryHandler = () => {
        navigate('/create-dictionary')
    }

    const openDictionaryHandler = (id: number) => {
        console.log(`click on open dictionary with id:${id}`)
    }

    return (
        <div className="min-h-[calc(100%-190px)] bg-secondaryBg rounded-t-[55px] shadow-primary p-[30px] ">
            <div className="flex flex-wrap items-start justify-between">
                {dictionaries.length > 0 &&
                    dictionaries.map((item) => (
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
                <AddDictionary onClick={addDictionaryHandler} />
            </div>
        </div>
    )
}

export default MyDictionaries
