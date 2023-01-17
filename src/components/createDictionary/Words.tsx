import React from 'react'
import Button from '../Button'
import Word from './Word'
import { nanoid } from 'nanoid'

const Words = () => {
    const [words, setWords] = React.useState<
        Array<{
            word: string
            translation: string
            id: string
        }>
    >([])

    const onAddWordHandler = () => {
        setWords((prev) => [
            ...prev,
            {
                word: '',
                translation: '',
                id: nanoid(),
            },
        ])
    }

    const onChangeValue = (data: {
        id: string
        word: string
        translation: string
    }) => {
        const prevArr = words

        const index = words.findIndex(item => item.id == data.id)

        prevArr[index].translation = data.translation
        prevArr[index].word = data.word

        setWords(prevArr)
    }

    const onDeleteHandler = (id: string) => {
        const index = words.findIndex(item => item.id == id)
        setWords(prev => prev.filter((item) => item.id != id))

    }

    return (
        <>
            <div className="w-full">
                {words.length > 0 &&
                    words.map((item) => <Word  key={item.id} id={item.id} onChangeValue={onChangeValue} onDelete={onDeleteHandler} />)}
            </div>
            <div className="w-full bg-secondaryBg shadow-primary rounded-[10px] p-[6px] flex mb-[40px]">
                <Button
                    styles="flex-auto mr-[6px]"
                    size="large"
                    name="Add"
                    color="#0086EA"
                    hoverColor="#53A0FF"
                    activeColor="#0D6CBD"
                    onClick={onAddWordHandler}
                />
                <Button
                    width="185px"
                    size="large"
                    name="Save"
                    color="#1D9745"
                    hoverColor="#24b553"
                    activeColor="#157b2f"
                    disabled={words.length === 0}
                />
            </div>
        </>
    )
}

export default Words
