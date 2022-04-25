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
        userData: {},
        menuOpen: false,
        menuClosing: false
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
                    avatarUrl={this.state.userData.avatarUrl}
                />
            </>
        }

        let toggleMenu = () => {
            if(this.state.menuOpen) {
                this.setState({menuClosing: true});
                setTimeout(() => {
                    this.setState({menuOpen: false, menuClosing: false});
                }, 500);
            } else {
                this.setState({menuOpen: true});
            }
        }

        return (<>
        <JoinDialog parent={this} />
        <SigninDialog parent={this} />
        <div className='navbar-wrapper'>
            <div className='navbar'>
                <NavbarButton 
                    icon="uil:bars" className="burger-menu-button" 
                    onClick={toggleMenu}
                />
                <div className='navbar-left'>
                    <NavbarLogo />
                </div>
                <div 
                    className={"navbar-mobile-wrapper" + (this.state.menuOpen ? ' open': '') + (this.state.menuClosing ? ' closing': '')}
                    onClick={toggleMenu}
                >
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