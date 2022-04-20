import React from 'react';
import MainBlock from '../website/MainBlock';
import ErrorBox from '../general/ErrorBox';

import * as util from '../../scripts/util';

class BanPage extends React.Component {

    state = {
        data: null
    }

    componentDidMount () {
        util.hookToUserUpdate(user => {
            if(user) this.setState({ data: user });
        });
    }

    render () {
        return (
            <div className="fullh-nf">
                {this.state.data ?
                <>
                <MainBlock>
                    <h1>Ваш Аккаунт Забананен</h1>
                    <p>
                        {util.getJoinDate(new Date(this.state.data.banDate))}, 
                        модератором <b>{this.state.data.banAdmin.displayName}</b> (<i>@{this.state.data.banAdmin.username}</i>)
                        было принято решение о блокировке вашего аккаунта.
                    </p>
                    <p> Причина: </p>
                    <ErrorBox
                        text={this.state.data.reason || "Неизвестная причина"}
                        className="tal"
                    />
                </MainBlock>
                <MainBlock>
                    <h2>Заявка на Разбан</h2>
                    <p>Если вы считаете, что бан был несправедливым или хотите раскаять сея грехи, пожалуйста <a href="/contact#appeal">свяжитесь с нами</a></p>
                </MainBlock>
                </>
                : <div className='spinner big primary'/>}
            </div>
        );
    }
};

export default BanPage;
