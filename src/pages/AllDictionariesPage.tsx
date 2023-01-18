import React from 'react';
import Dictionaries from '../components/allDictionaries/Dictionaries';
import SearchBlock from '../components/allDictionaries/SearchBlock';
import { useAppDispatch } from '../hooks/reduxHooks';
import { fetchDictionariesByOtherUsers } from '../redux/features/dictionarySlice';

const AllDictionariesPage: React.FC = () => {

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchDictionariesByOtherUsers())
    }, [])

    return (
        <div className='pb-[40px] animate-appearance'>
            <SearchBlock />
            <Dictionaries />
        </div>
    );
};

export default AllDictionariesPage;