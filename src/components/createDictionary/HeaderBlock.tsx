import React from 'react'
import { InputSizeEnum } from '../../types'
import Radio from '../input/Radio'
import TextInput from '../input/TextInput'
import Tag from '../Tag'

type HeaderBlockProps = {
    onChangeAccess: (trueId: string) => void
    access: 'public' | 'private'
    onChangeName: (e: React.ChangeEvent<any>) => void
    nameValue: string
    errorNameField?: string 
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({
    onChangeAccess,
    access,
    onChangeName,
    nameValue,
    errorNameField,
}) => {
    return (
        <div className="flex flex-col items-center  w-full">
            <TextInput
                width="444px"
                size='large'
                value={nameValue}
                onChange={onChangeName}
                name="nameDictionary"
                placeholder="Dictionary name"
                error={errorNameField}
            />
            <div className="flex items-center pt-[30px] pb-[60px]">
                <Radio
                    id="public"
                    name="access-create-dictionary"
                    styles="mr-[13px]"
                    beforeLabel
                    value={access === 'public'}
                    onChange={onChangeAccess}
                >
                    <Tag name="Public" color="#C89600" />
                </Radio>
                <Radio
                    id="private"
                    name="access-create-dictionary"
                    beforeLabel
                    value={access === 'private'}
                    onChange={onChangeAccess}
                >
                    <Tag name="Private" color="#00AEBF" />
                </Radio>
            </div>
        </div>
    )
}

export default HeaderBlock
