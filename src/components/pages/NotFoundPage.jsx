import React from 'react';
import MainBlock from '../website/MainBlock';

class NotFoundPage extends React.Component {
    render () {
        return (
            <center className="fullh">
                <MainBlock minw>
                    <h1 className="accent">Страница Не Найдена!</h1>
                    <p>Убедитесь, что вы правильно написали URL страницы!</p>
                    <p className="primary"><b>404</b></p>
                </MainBlock>
            </center>
        );
    }
};

export default NotFoundPage;
