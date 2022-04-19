import React from 'react';
import Notification from '../general/Notification';

import bannerWelcome from '../../assets/BannerWelcome.svg';

class WelcomeNotification extends React.Component {
    render () {
        return (<Notification
            id="Welcome" oneTime
            icon={bannerWelcome}
            message={
                <>
                <b>Добро пожаловать в новый сайт РСС!</b> Пока что сайт находиться в альфа версии, 
                вы можете лишь создавать аккаунты. Скоро на сайт будут добавлены новые фичи, 
                такие как посты, новости, чат и другие. Следите за обновлениями! 🤗🎉
                </>
            }
            button={{ text: "Понятно", onClick: (self) => { self.close(); }}}
            close
        />);
    }
}

export default WelcomeNotification;