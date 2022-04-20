import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import * as util from './scripts/util';

import Navbar from './components/website/Navbar';
import Footer from './components/website/Footer';
import WelcomeNotification from './components/website/WelcomeNotification';
import VerifyEmailNotification from './components/website/VerifyEmailNotification';
import VerifiedEmailNotification from './components/website/VerifiedEmailNotification';

import MainPage from './components/pages/MainPage';
import NotFoundPage from './components/pages/NotFoundPage';
import ProfilePage from './components/pages/ProfilePage';
import BanPage from './components/pages/BanPage';
import VerifyEmailPage from './components/pages/VerifyEmailPage';

util.getUserData();

ReactDOM.render(
  <React.StrictMode>
    <WelcomeNotification />
    <VerifyEmailNotification />
    <VerifiedEmailNotification />
    <Navbar />

    <Router>
      <Routes>

        <Route exact element={<MainPage/>} path="/" />
        <Route exact element={<NotFoundPage/>} path="*" />
        <Route exact element={<NotFoundPage/>} path="/users" />
        <Route exact element={<ProfilePage/>} path="/users/*" />
        <Route exact element={<BanPage/>} path="/banned" />
        <Route exact element={<VerifyEmailPage/>} path="/verifyEmail" />

      </Routes>
    </Router>

    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
