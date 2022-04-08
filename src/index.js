import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

import Navbar from './components/website/Navbar';
import Footer from './components/website/Footer';

import MainPage from './components/pages/MainPage';
import NotFoundPage from './components/pages/NotFoundPage';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />

    <Router>
      <Routes>

        <Route exact element={<MainPage/>} path="/" />
        <Route exact element={<NotFoundPage/>} path="*" />

      </Routes>
    </Router>

    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
