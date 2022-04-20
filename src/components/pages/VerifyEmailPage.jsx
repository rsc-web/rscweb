import React from 'react';
import axios from 'axios';
import server from '../../assets/server.json';

import MessageBlock from '../general/MessageBlock';
import * as util from '../../scripts/util';

class VerifyEmailPage extends React.Component {

    state = {
        token: util.getUrlParam('token'),
        uid: null,
        loading: true,
        error: false
    }

    sendRequest () {
        axios.post(`${server.domain}/user/verifyEmail`, {
            uid: this.state.uid,
            emailToken: this.state.token
        }).then(() => {
            this.setState({ loading: false });
            localStorage.removeItem('showNotifEmailVerSuccess');
            window.location.href = 'https://rscweb.space';
        }).catch(err => {
            console.error(err.response.data);
            this.setState({ loading: false, error: true });
        });
    }

    componentDidMount () {
        util.hookToUserUpdate(user => {
            if(user) {
                this.setState({ uid: user.uid });
                setTimeout(() => {
                    this.sendRequest();
                }, 0);
            }
            else this.setState({ loading: false, error: true });
        });
    }

    render () {
        return (
            <div className="fullh-nf">
                {!this.state.loading ?
                (this.state.error ?
                    <MessageBlock
                        minw loadAppear
                        heading="Ошибка при подтверждении почты!"
                        description="Убедитесь, что вы зашли с правильного аккаунта и что письмо о подтверждении не устарело."
                        caption="Ошибка"
                    />
                : null)
                : <div className='spinner big primary'/>}
            </div>
        );
    }
};

export default VerifyEmailPage;
