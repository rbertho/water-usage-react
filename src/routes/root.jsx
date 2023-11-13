import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';

import About from '../pages/About';
import Login from '../pages/Login';
import Home from '../pages/Home';
import NotFound from '../pages/notfound';   

const Rotas = () => {
    return (
        <Router>
            <Routes>
                    <Route path="/about" element={<About />} />
                    <Route 
                        path="/" 
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        } />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default Rotas;