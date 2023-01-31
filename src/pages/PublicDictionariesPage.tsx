import React from 'react';
import PublicDictionaries from '../components/publicDictionaries/PublicDictionaries';
import SearchBlock from '../components/publicDictionaries/SearchBlock';
import { useAppDispatch } from '../hooks/reduxHooks';
import { fetchDictionariesByOtherUsers } from '../redux/features/dictionarySlice';

const PublicDictionariesPage: React.FC = () => {

    const dispatch = useAppDispatch()



    return (
        <div className='pb-[40px] animate-appearance'>
            <SearchBlock />
            <PublicDictionaries />
        </div>
    );
};

export default PublicDictionariesPage;