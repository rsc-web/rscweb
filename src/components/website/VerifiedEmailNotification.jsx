import React from 'react';
import Notification from '../general/Notification';
import * as util from '../../scripts/util';

class VerifiedEmailNotification extends React.Component {

    state = {
        user: null
    }
    
    componentDidMount () {
        util.hookToUserUpdate(user => {
            this.setState({ user });
        });
    }

    render () {
        return (this.state.user && this.state.user.badges.emailVerified ? <Notification
            id="EmailVerSuccess" oneTime success
            message={
                <>
                <b>Поздравляем, емайл подтверждён!</b> Теперь вы можете пользоваться всеми функциями сайта РСС!
                </>
            }
            button={{ text: "Отлично", onClick: (self) => { self.close(); }}}
        /> : null);
    }
}

export default VerifiedEmailNotification;