import React from 'react'
import { InputSizeEnum } from '../../types'
import TextInput from '../input/TextInput'
import CloseIcon from '../../assets/icons/CloseIcon'
import SearchFindIcon from '../../assets/icons/SearchFindIcon'

const SearchBlock: React.FC = () => {
    const [value, setValue] = React.useState('')

    const onChangeValue = (e: React.ChangeEvent<any>) => {
        setValue(e.target.value)
    }

    const onClearValueHandler = () => {
        setValue('')
    }

    return (
        <div className="pb-[22px]">
            <TextInput
                size={InputSizeEnum.Large}
                width="100%"
                onChange={onChangeValue}
                value={value}
                name="searchByNameDictionaries"
                placeholder="Search by name"
                RightIcon={<CloseIcon height="24" width="24" color="#0E1114" />}
                onClickRightIcon={onClearValueHandler}
                LeftIcon={
                    <SearchFindIcon height="24" width="24" color="#8FA0AF" />
                }
            />
        </div>
    )
}

export default SearchBlock
