import React from 'react';
import { Outlet } from 'react-router-dom';

// component
import Header from '../components/Header';
import Footer from '../components/Footer';

const Common = () => (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
);

export default Common;
