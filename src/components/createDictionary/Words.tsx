import React from 'react'
import Button from '../Button'
import Word from './Word'

const Words = () => {
    const [words, setWords] = React.useState<
        Array<{
            word: string
            translation: string
            id: number
        }>
    >([])

    const onAddWordHandler = () => {
        setWords((prev) => [
            ...prev,
            {
                word: '',
                translation: '',
                id: 1,
            },
        ])
    }

    const onChangeValue = (data: {
        id: number
        word: string
        translation: string
    }) => {}

    return (
        <>
            <div className="w-full">
                {words.length > 0 &&
                    words.map((item) => <Word onChangeValue={onChangeValue} />)}
            </div>
            <div className="w-full bg-secondaryBg shadow-primary rounded-[10px] p-[6px] flex">
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
                />
            </div>
        </>
    )
}

export default Words
