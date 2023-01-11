import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from '../components/Navbar';

import Home from './Home';

const Main = () => {


    
    return (
        <div className='h-full relative'>
           
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    );
};

export default Main;