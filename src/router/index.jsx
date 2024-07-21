import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

// laout
import Common from '../layout/Common';

const index = () => (
    <>
        <BrowserRouter>
            <Routes>
                <Route element={<Common />}>
                    <Route exact path="/" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
);

export default index;
