import React from 'react';
import MessageBlock from '../general/MessageBlock';

class NotFoundPage extends React.Component {
    render () {
        return (
            <MessageBlock 
                minw
                heading="Страница Не Найдена!"
                description="Убедитесь, что вы правильно написали URL страницы!"
                caption="404"
            />
        );
    }
};

export default NotFoundPage;
