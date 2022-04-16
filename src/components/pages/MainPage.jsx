import React from 'react';
import MainBlock from '../website/MainBlock';

class MainPage extends React.Component {
    render () {
        return (
            <div className="fullh-nf">
                <MainBlock primary>
                    <h1>Добро Пожаловать в Сайт РСС!</h1>
                    <p>
                        <b>РСС Web</b> - сайт самого большого русскоязычного сообщества Scratch. 
                        Он предоставляет платформу для общения, обсуждения и слежкой за новостями, 
                        происходящих внутри сообщества. Присоединяйтесь к сотням Скретчеров уже сейчас,
                        создав аккаунт!
                    </p>
                    <p>
                        На главной странице вы можете посмотреть самые важные вещи, такие как свежие
                        новости, недавние посты, опросы и др. Рекоммендуем также ознакомиться со 
                        страницами <b>постов, новостей и РСС Вики!</b>
                    </p>
                </MainBlock>
                <MainBlock>
                    <h2>В Новостях</h2>
                </MainBlock>
                <MainBlock>
                    <h2>Проекты в Тренде</h2>
                </MainBlock>
                <MainBlock>
                    <h2>Недавние Посты</h2>
                </MainBlock>
                <MainBlock>
                    <h2>Новые Пользователи</h2>
                </MainBlock>
            </div>
        );
    }
};

export default MainPage;
