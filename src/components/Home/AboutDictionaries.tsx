import React from 'react'
import dictionriesImg from './../../images/home-my-dictionaries.png'

interface AboutDictionariesProps {}

const AboutDictionaries: React.FC<AboutDictionariesProps> = () => {
    return (
        <div className="w-full h-[550px] bg-white/20 flex justify-center items-center">
            <div className="flex justify-center items-center">
                <p className="text-white text-[30px] font-medium w-[380px]">
                    You can create dictionaries and add words to it :)
                </p>
                <img className="h-[300px]" src={dictionriesImg} />
            </div>
        </div>
    )
}

export default AboutDictionaries
