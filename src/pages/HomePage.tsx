import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddDictionary from '../components/Home/AddDictionary'
import MyDictionary from '../components/Home/MyDictionary'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { fetchDictionaries } from '../redux/features/dictionarySlice'

const HomePage = () => {
    
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const dictionaries = useAppSelector(
        (state) => state.dictionary.dictionaries
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
        <div className="flex justify-center h-full w-full">
            <div className="w-[900px] h-full">
                <div className="h-[190px] pt-[32px] text-white tracking-wide">
                    <h3 className="font-medium text-[40px] pb-[12px] leading-[50px]">
                        28 words
                    </h3>
                    <p className="text-[20px] leading-[25px]">
                        10 studied words
                    </p>
                    <p className="text-[18px] leading-[23px]">3 dictionaries</p>
                </div>
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
                                    access={
                                        item.isPublic ? 'public' : 'private'
                                    }
                                />
                            ))}
                        <AddDictionary onClick={addDictionaryHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
