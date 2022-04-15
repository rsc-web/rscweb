import React from 'react';

import './Button.css';

class Button extends React.Component {

    render () {
        return (
            <button 
                className={'button ' + this.props.className} 
                disabled={this.props.disabled || this.props.loading} 
                onClick={this.props.onClick}>
                    {this.props.loading ? 
                    <div className="button-loading"/>
                    : this.props.text}
            </button>
        );
    }

}

export default Button;