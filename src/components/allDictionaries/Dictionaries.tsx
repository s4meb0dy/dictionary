import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import Dictionary from './Dictionary';

const Dictionaries:React.FC = () => {

    const dictionaries = useAppSelector(state => state.dictionary.dictionaries)

    return (
        <div className='animate-appearance'>
            {dictionaries.length > 0 && dictionaries.map(item => <Dictionary key={item.id} name={item.name} words={item.words.length} id={1} />)}
        </div>
    );
};

export default Dictionaries;