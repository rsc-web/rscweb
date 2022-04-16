import React from 'react';

import './Navbar.css';
import * as util from '../../scripts/util';

import NavbarLogo from './NavbarLogo';
import NavbarButton from './NavbarButton';
import NavbarUser from './NavbarUser';

import JoinDialog from '../dialogs/JoinDialog';
import SigninDialog from '../dialogs/SigninDialog';

class Navbar extends React.Component {

    state = {
        joinDialogOpen: false,
        signinDialogOpen: false,
        loggedIn: false,
        loading: true,
        userData: {}
    }

    componentDidMount () {
        util.hookToUserUpdate((user, error) => {
            this.setState({ loading: false, loggedIn: !!user, userData: user || {} });
            if(error) return console.error(error);
        });
    }

    render () {

        let navbarRight = {
            notLoggedIn: <>
                <NavbarButton
                    text="Создать Аккаунт!"
                    icon="uil:user-plus"
                    white
                    onClick={() => { this.setState({joinDialogOpen: true}) }}
                />
                <NavbarButton
                    text="Войти"
                    icon="uil:signin"
                    onClick={() => { this.setState({signinDialogOpen: true}) }}
                />
            </>,
            loggedIn: <>
                <NavbarUser
                    username={this.state.userData.username}
                    avatar={this.state.userData.avatarUrl}
                />
            </>
        }

        return (<>
        <JoinDialog parent={this} />
        <SigninDialog parent={this} />
        <div className='navbar-wrapper'>
            <div className='navbar'>
                <div className='navbar-left'>
                    <NavbarLogo />
                </div>
                <div className='navbar-center'>
                    <NavbarButton
                        text="Главная"
                        icon="uil:home-alt"
                        link="/"
                    />
                    <NavbarButton
                        text="Посты"
                        icon="uil:comment-alt-lines"
                        link="/posts"
                    />
                    <NavbarButton
                        text="Проекты"
                        icon="uil:notebooks"
                        link="/explore"
                    />
                    <NavbarButton
                        text="Вики"
                        icon="uil:globe"
                        link="https://wiki.rscweb.space"
                    />
                    <NavbarButton
                        text="Новости"
                        icon="uil:newspaper"
                        link="/news"
                    />
                </div>
                <div className='navbar-right'>
                    {this.state.loading ? <div className="spinner"/> : (this.state.loggedIn ? navbarRight.loggedIn : navbarRight.notLoggedIn)}
                </div>
            </div>
        </div>
        </>);
    }

}

export default Navbar;