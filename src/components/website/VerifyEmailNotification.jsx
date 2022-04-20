import React from 'react';
import Notification from '../general/Notification';
import axios from 'axios';
import * as util from '../../scripts/util';
import server from '../../assets/server.json';

class VerifyEmailNotification extends React.Component {

    state = {
        loading: false,
        user: null
    }

    sendRequest (self) {
        this.setState({ loading: true });
        axios.post(`${server.domain}/user/sendEmailVerification`, {
            authToken: localStorage.getItem('authToken')
        }).catch(err => {
            alert(`Ошибка! ${err.response.data}`);
        }).finally(() => {
            self.close();
        });
    }
    
    componentDidMount () {
        util.hookToUserUpdate(user => {
            this.setState({ user });
        });
    }

    render () {
        return (this.state.user && !this.state.user.badges.emailVerified ? <Notification
            id="EmailVer" loading={this.state.loading} warning
            message={
                <>
                <b>Ваш емайл не подтверждён!</b> Пожалуйста, подтвердите ваш адрес электронной почты, чтобы получить доступ к
                функциям сайта РСС!
                </>
            }
            button={{ text: "Отправить Письмо", onClick: (self) => { this.sendRequest (self); }}}
            close
        /> : null);
    }
}

export default VerifyEmailNotification;