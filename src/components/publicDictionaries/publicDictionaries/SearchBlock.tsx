import React from 'react'
import TextInput from '../../input/TextInput'
import CloseIcon from '../../../assets/icons/CloseIcon'
import SearchFindIcon from '../../../assets/icons/SearchFindIcon'
import debounce from 'lodash.debounce'
import { useAppSelector } from '../../../hooks/reduxHooks'

interface SearchBlockProps {
    onSearch: (value: string) => void
}

const SearchBlock: React.FC<SearchBlockProps> = ({ onSearch }) => {
    const [value, setValue] = React.useState('')


    const debouncedSearch = React.useRef(
        debounce((searchTerm) => {
            onSearch(searchTerm)
        }, 300)
    ).current

    const onChangeValue = (e: React.ChangeEvent<any>) => {
        setValue(e.target.value)
        debouncedSearch(e.target.value)
    }

    const onClearValueHandler = () => {
        setValue('')
        debouncedSearch('')
    }

    return (
        <div className="pb-[22px]">
            <TextInput
                size='large'
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
