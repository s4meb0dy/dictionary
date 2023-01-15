import React from 'react'
import TextInput from '../components/input/TextInput'
import Radio from '../components/input/Radio'
import Tag from '../components/Tag'
import { InputSizeEnum } from '../types'
import WordBlock from '../components/createDictionary/WordBlock'
import Button from '../components/Button'

const CreateDictionaryPage: React.FC = () => {
    const [nameValue, setNameValue] = React.useState('')

    const onChangeNameHandler = (e: React.ChangeEvent<any>) => {
        setNameValue(e.target.value)
    }

    return (
        <div className="flex flex-col items-center px-[105px]">
            <TextInput
                width="444px"
                size={InputSizeEnum.Large}
                value={nameValue}
                onChange={onChangeNameHandler}
                name="nameDictionary"
                placeholder="Name"
            />
            <div className="flex items-center pt-[30px] pb-[60px]">
                <Radio
                    id="public"
                    name="access-create-dictionary"
                    styles="mr-[13px]"
                    beforeLabel
                    checked
                >
                    <Tag name="Public" color="#C89600" />
                </Radio>
                <Radio id="private" name="access-create-dictionary" beforeLabel>
                    <Tag name="Private" color="#00AEBF" />
                </Radio>
            </div>
            <div className="w-full">
                <WordBlock />
                <WordBlock />
            </div>
            <div className='w-full bg-secondaryBg shadow-primary rounded-[10px] p-[6px] flex'>
                <Button styles='flex-auto mr-[6px]' size='large' name='Add' />
                <Button width='185px' size='large' name='Save' />
            </div>
        </div>
    )
}

export default CreateDictionaryPage
