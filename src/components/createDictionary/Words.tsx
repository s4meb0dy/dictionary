import React from 'react'
import Button from '../Button'
import Word from './Word'

const Words = () => {
    const [words, setWords] = React.useState<
        Array<{
            word: string
            translation: string
            onChangeWordHandler: (e: React.ChangeEvent<any>) => void
            onChangeTranslationHandler: (e: React.ChangeEvent<any>) => void
        }>
    >([])

    const onAddWordHandler = () => {
        setWords((prev) => [
            ...prev,
            {
                word: '',
                translation: '',
                onChangeWordHandler: function (e) {
                    this.word = e.target.value
                },
                onChangeTranslationHandler: function (e) {
                    this.translation = e.target.value
                },
            },
        ])
    }

    return (
        <>
            <div className="w-full">
                {words.length > 0 &&
                    words.map((item) => (
                        <Word
                            wordValue={item.word}
                            translationValue={item.translation}
                            onChangeWordHandler={item.onChangeWordHandler}
                            onChangeTranslationHandler={
                                item.onChangeTranslationHandler
                            }
                        />
                    ))}
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
