import React from 'react'
import TextInput from '../components/input/InputText'
import Radio from '../components/input/Radio'
import Tag from '../components/Tag'
import { InputSizeEnum } from '../types'

const CreateDictionaryPage: React.FC = () => {
    const [nameValue, setNameValue] = React.useState('')

    const onChangeNameHandler = (e: React.ChangeEvent<any>) => {
        setNameValue(e.target.value)
    }

    return (
        <div className="flex flex-col items-center">
            <TextInput
                width="444px"
                size={InputSizeEnum.Large}
                value={nameValue}
                onChange={onChangeNameHandler}
                name="nameDictionary"
                placeholder="Name"
            />
            <div className='flex items-center pt-[30px]'>
                <Radio id="public" name="access-create-dictionary" styles='mr-[13px]' beforeLabel>
                    <Tag name="Public" color="#C89600" />
                </Radio>
                <Radio id="private" name="access-create-dictionary" beforeLabel>
                    <Tag name="Private" color="#00AEBF" />
                </Radio>
            </div>
        </div>
    )
}

export default CreateDictionaryPage
