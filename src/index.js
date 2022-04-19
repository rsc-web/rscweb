import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import * as util from './scripts/util';

import Navbar from './components/website/Navbar';
import Footer from './components/website/Footer';
import WelcomeNotification from './components/website/WelcomeNotification';

import MainPage from './components/pages/MainPage';
import NotFoundPage from './components/pages/NotFoundPage';
import ProfilePage from './components/pages/ProfilePage';
import BanPage from './components/pages/BanPage';

util.getUserData();

ReactDOM.render(
  <React.StrictMode>
    <WelcomeNotification />
    <Navbar />

    <Router>
      <Routes>

        <Route exact element={<MainPage/>} path="/" />
        <Route exact element={<NotFoundPage/>} path="*" />
        <Route exact element={<NotFoundPage/>} path="/users" />
        <Route exact element={<ProfilePage/>} path="/users/*" />
        <Route exact element={<BanPage/>} path="/banned" />

      </Routes>
    </Router>

    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
