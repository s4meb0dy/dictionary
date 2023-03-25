import React from 'react'
import AboutDictionaries from '../../components/Home/AboutDictionaries'
import Header from '../../components/Home/Header'
import Main from '../../components/Home/Main'

const HomePage = () => {
    return (
        <div className="h-full w-full animate-appearance">
            <Header />
            <main className="w-full">
                <Main />
                <AboutDictionaries />
            </main>
        </div>
    )
}

export default HomePage
