import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';

import Login from '../pages/Login';
import NotFound from '../pages/notfound';   
import RootPage from '../RootPage';

const Rotas = () => {
    return (
        <Router>
            <Routes>
                    <Route 
                        path="/" 
                        element={
                            <PrivateRoute>
                                <RootPage />
                            </PrivateRoute>
                        } />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default Rotas;