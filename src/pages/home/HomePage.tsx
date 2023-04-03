import React from 'react'
import Content from '../../components/Home/Content'
import LineOfDictionaries from '../../components/Home/LineOfDictionaries'
import Header from '../../components/Home/Header'
import Preview from '../../components/Home/Preview'


const HomePage = () => {
    return (
        <div className="h-full w-full animate-appearance flex flex-col">
            <Header />
            <main className="w-full flex-auto flex flex-col">
                <Preview />
                <Content>
                    <LineOfDictionaries />
                </Content>
            </main>
        </div>
    )
}

export default HomePage
