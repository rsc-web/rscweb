import React from 'react';

import './Navbar.css';

import NavbarLogo from './NavbarLogo';
import NavbarButton from './NavbarButton';

class Navbar extends React.Component {

    render () {
        return (<div className='navbar-wrapper'>
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
                        link="wiki.rscweb.space"
                    />
                    <NavbarButton
                        text="Новости"
                        icon="uil:newspaper"
                        link="/news"
                    />
                </div>
                <div className='navbar-right'>
                    <NavbarButton
                        text="Создать Аккаунт!"
                        icon="uil:user-plus"
                        white
                    />
                    <NavbarButton
                        text="Войти"
                        icon="uil:signin"
                    />
                </div>
            </div>
        </div>);
    }

}

export default Navbar;