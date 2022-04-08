import React from 'react';

import './Footer.css';

class Footer extends React.Component {

    render () {
        return (<div className='footer'>
            {this.props.children}
        </div>);
    }

}

export default Footer;