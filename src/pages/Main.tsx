import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeContainer from '../components/Home/HomeContainer';

import Navbar from '../components/Navbar';

import Home from './Home';

const Main = () => {


    
    return (
        <div className='h-full'>
     
            <Navbar />
            <Routes>
                <Route path='/' element={<HomeContainer />} />
            </Routes>
        </div>
    );
};

export default Main;