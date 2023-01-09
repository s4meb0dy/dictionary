import React from 'react'
import AddDictionary from '../components/Home/AddDictionary'
import MyDictionary from '../components/Home/MyDictionary'

const Home = () => {

    const addDictionaryHandler = () => {
        console.log('click on add dictionary')
    }

    const openDictionaryHandler = (id: number) => {
        console.log(`click on open dictionary with id:${id}`)
    }

    return (
        <div className="relative flex justify-center h-full">
            <div className="w-[900px] h-full ">
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
                    <div className='flex flex-wrap items-start justify-between'>
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={2} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='private' id={3} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={4} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='private' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='private' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='private' id={1} onClick={openDictionaryHandler} />
                        <MyDictionary name='Wether' words={3} learnedWords={2} access='public' id={1} onClick={openDictionaryHandler} />
                        <AddDictionary onClick={addDictionaryHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
