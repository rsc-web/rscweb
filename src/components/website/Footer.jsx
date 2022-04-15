import React from 'react';

import './Footer.css';

import FooterCategory from './FooterCategory';
import NavbarLogo from './NavbarLogo';

class Footer extends React.Component {

    render () {
        return (<div className='footer'>
            <div className='footer-categories'>
                <FooterCategory hideMobile title="О РСС" items={[
                    {text: 'РСС: Вкратце', link: '/about'},
                    {text: 'Наша Команда', link: '/about#team'}
                ]} />
                <FooterCategory hideMobile title="Сервисы" items={[
                    {text: 'РСС Web', link: '/'},
                    {text: 'Вики', link: 'https://wiki.rscweb.space'},
                    {text: 'Сервер', link: 'https://wiki.rscweb.space/index.php/РСС_Дискорд'},
                    {text: 'Новости', link: '/news'},
                ]} />
                <FooterCategory title="Поддержка" items={[
                    {text: 'Частые Вопросы', link: '/faq'},
                    {text: 'Связаться с Нами', link: '/contact'},
                    {text: 'Пожаловаться', link: '/contact#report'},
                    {text: 'Помощь', link: '/contact#help'},
                ]} />
                <FooterCategory title="Права" items={[
                    {text: 'Условия Использования', link: '/terms'},
                    {text: 'Политика Конфиденциальности', link: '/privacy'},
                ]} />
                </div>
            <div className="footer-bottom">
                <NavbarLogo />
                <p>© Ucrash, All rights reserved</p>
            </div>
        </div>);
    }

}

export default Footer;