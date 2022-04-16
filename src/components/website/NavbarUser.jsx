import React from 'react';
import * as util from '../../scripts/util';

import NavbarButton from './NavbarButton';

const defaultAvatar = 'https://uploads.scratch.mit.edu/get_image/user/1350_256x256.png';

class NavbarUser extends React.Component {

    render() {
        return (
            <div className="navbar-user">
                <a href={`/users/${this.props.username}`} className="navbar-button navbar-user-button" title="Мой профиль">
                    <img src={this.props.avatar || defaultAvatar} alt="Avatar" className="navbar-user-avatar" />
                    <span className="navbar-user-name">{this.props.username}</span>
                </a>
                <NavbarButton link="/account" title="Настройки аккаунта" icon="uil:wrench" />
                <NavbarButton onClick={() => {
                    let prompt = window.confirm('Вы уверены, что хотите выйти?');
                    if(prompt) util.signOut();
                }} title="Выйти" icon="uil:exit" />
            </div>
        );
    }

}

export default NavbarUser;