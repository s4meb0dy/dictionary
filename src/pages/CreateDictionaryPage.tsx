import React from 'react'
import TextInput from '../components/input/TextInput'
import Radio from '../components/input/Radio'
import Tag from '../components/Tag'
import { InputSizeEnum } from '../types'
import Word from '../components/createDictionary/Word'
import Button from '../components/Button'
import Words from '../components/createDictionary/Words'

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
                    defaultChecked
                >
                    <Tag name="Public" color="#C89600" />
                </Radio>
                <Radio id="private" name="access-create-dictionary" beforeLabel>
                    <Tag name="Private" color="#00AEBF" />
                </Radio>
            </div>
            <Words />
            
        </div>
    )
}

export default CreateDictionaryPage
