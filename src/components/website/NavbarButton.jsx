import React from 'react';
import { Icon } from '@iconify/react';

class NavbarButton extends React.Component {

    render () {
        let className = 'navbar-button';
        if(this.props.white) className += ' white';
        if(!this.props.text) className += ' icon';
        return <a href={this.props.link} title={this.props.title} className={className} onClick={this.props.onClick}>
            {this.props.icon ? <Icon icon={this.props.icon} /> : null}
            {this.props.text}
        </a>
    }

}

export default NavbarButton;