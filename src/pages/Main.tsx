import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InfoBlock from '../components/InfoBlock';
import Navbar from '../components/Navbar';
import Home from './Home';

const Main = () => {
    return (
        <div className='h-full relative'>
            <InfoBlock type='error' title={'Error'} text={'Error text text'} />
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    );
};

export default Main;