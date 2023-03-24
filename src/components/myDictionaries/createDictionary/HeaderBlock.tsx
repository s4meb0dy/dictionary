import React from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import Tag from '../../info/Tag'
import Radio from '../../input/Radio'
import TextInput from '../../input/TextInput'

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
    const deviceType = useAppSelector((state) => state.app.deviceType)

    return (
        <div className="m-auto w-full max-w-[444px] flex flex-col items-center">
            <TextInput
                width="100%"
                size={deviceType === 'Mobile' ? 'medium' : 'large'}
                value={nameValue}
                onChange={onChangeName}
                name="nameDictionary"
                placeholder="Dictionary name"
                error={errorNameField}
            />
            <div className="flex items-center py-[20px] pb-[30px] sm:pt-[30px] sm:pb-[60px]">
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
