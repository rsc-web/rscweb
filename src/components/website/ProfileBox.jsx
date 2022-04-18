import React from 'react';
import * as util from '../../scripts/util';

import ProfileBoxHeader from './ProfileBoxHeader';

import './ProfileBox.css';

class ProfileBox extends React.Component {

    state = {
        isSelf: false,
    }

    componentDidMount () {
        util.hookToUserUpdate(user => {
            if(user && this.props.username == user.username) this.setState({ isSelf: true });
        });
    }

    render () {
        return (
            <div className="profile-box fullh-nf">
                <ProfileBoxHeader 
                    displayName={this.props.displayName}
                    username={this.props.username}
                    avatarUrl={this.props.avatarUrl}
                    role={this.props.role}
                    joinDate={this.props.joinDate}
                    editable={this.state.isSelf}
                    page={this.props.page}
                />
                <div className="profile-box-section">
                    <h2>О себе</h2>
                    <p className={this.props.description ? '' : 'empty'}>{this.props.description || 'Пусто'}</p>
                </div>
                <div className="profile-box-section">
                    <h2>Недавние Посты</h2>
                    <p>Coming Soon</p>
                </div>
                <div className="profile-box-section">
                    <h2>Подписчики</h2>
                    <p>Coming Soon</p>
                </div>
            </div>
        );
    }

}

export default ProfileBox;