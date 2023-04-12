import React from 'react'
import Content from '../../components/preview/Content'
import LineOfDictionaries from '../../components/preview/LineOfDictionaries'
import Header from '../../components/preview/Header'
import Banner from '../../components/preview/Banner'
import About from '../../components/preview/About'

const PreviewPage = () => {
    return (
        <div className="h-full w-full animate-appearance flex flex-col">
            <Header />

            <main className="w-full flex-auto flex flex-col">
                <Banner />
                <Content>
                    <LineOfDictionaries />
                    <About />
                </Content>
            </main>
        </div>
    )
}

export default PreviewPage
