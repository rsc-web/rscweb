import React from 'react';

import logo from '../../assets/logo.png';

class NavbarLogo extends React.Component {

    render () {
        return <a href="/"><img src={logo} alt="Логотип РСС" draggable="false" className='navbar-logo'/></a>
    }

}

export default NavbarLogo;