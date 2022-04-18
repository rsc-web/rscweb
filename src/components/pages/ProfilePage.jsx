import React from 'react';
import axios from 'axios';
import server from '../../assets/server.json';

import MessageBlock from '../general/MessageBlock';
import ProfileBox from '../website/ProfileBox';

class ProfilePage extends React.Component {

    username = window.location.pathname.split('/')[2] || '';
    state = {
        user: {},
        error: false,
        loading: true
    }

    requestData () {
        axios.get(`${server.domain}/users/${this.username}`).then(res => {
            this.setState({
                user: res.data,
                error: false,
                loading: false
            });
        }).catch(err => {
            this.setState({
                error: err.response.data,
                loading: false
            });
        });
    }

    componentDidMount () {
        this.requestData();
    }

    render () {
        return (
            this.state.loading ? <div className="fullh"><div className="spinner big primary"/></div> :(
            this.state.error ? <MessageBlock 
                minw loadAppear
                heading="Такого Участника нет в Системе!"
                description={`Мы не можем найти участника ${this.username}. Убедитесь, что вы правильно написали ник профиля!`}
                caption="404"
            /> :
            <ProfileBox
                displayName={this.state.user.displayName}
                username={this.state.user.username}
                avatarUrl={this.state.user.avatarUrl} 
                description={this.state.user.description}
                role={this.state.user.role}
                joinDate={this.state.user.joinDate}
            />)
        );
    }

};

export default ProfilePage;
