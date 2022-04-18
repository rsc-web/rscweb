import React from 'react';
import * as util from '../../scripts/util';

import NavbarButton from './NavbarButton';

class NavbarUser extends React.Component {

    render() {
        return (
            <div className="navbar-user">
                <a href={`/users/${this.props.username}`} className="navbar-button navbar-user-button" title="Мой профиль">
                    <img src={util.getAvatar(this.props.avatarUrl)} alt="Avatar" className="navbar-user-avatar" />
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