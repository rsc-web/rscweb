import React from 'react';
import { Icon } from '@iconify/react';
import * as util from '../../scripts/util';

import './ProfileBox.css';

class ProfileBox extends React.Component {

    state = {
        editable: false,
    }

    render () {
        return (
            <div className="profile-box fullh-nf">
                <div className="profile-box-header">
                    <img src={util.getAvatar(this.props.avatarUrl)} alt={this.props.displayName + ' Avatar'} className="profile-avatar" />
                    <div className="profile-box-name">
                        <h2>{this.props.displayName}</h2>
                        <h4>
                            <Icon icon="uil:at" />
                            {this.props.username}
                        </h4>
                    </div>
                    <div className="profile-box-info">
                        <div className="profile-box-info-group">
                            <Icon icon="uil:user" />
                            <span>{util.getRole(this.props.role)}</span>
                        </div>
                        <div className="profile-box-info-group">
                            <Icon icon="uil:calendar-alt" />
                            <span>Аккаунт создан {util.getJoinDate(this.props.joinDate)}</span>
                        </div>
                    </div>
                </div>
                <div className="profile-box-section">
                    <h2>О себе</h2>
                    <p>{this.props.description}</p>
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