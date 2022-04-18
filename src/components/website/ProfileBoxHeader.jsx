import React from 'react';
import { Icon } from '@iconify/react';
import * as util from '../../scripts/util';

import NavbarButton from './NavbarButton';

class ProfileBoxHeader extends React.Component {

    
    render () {
        const editButton = <NavbarButton
            icon="uil:pen"
            className="profile-box-edit"
            onClick={() => {
                this.props.page.setState({ editProfileDialogOpen: true });
            }}
        />;

        return (<div className="profile-box-header">
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
            {this.props.editable ? editButton : null}
        </div>);
    }

}

export default ProfileBoxHeader;