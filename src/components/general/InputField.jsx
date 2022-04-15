import React from 'react';
import { Icon } from '@iconify/react';

import './InputField.css';

class InputField extends React.Component {

    state = {
        value: this.props.value || '',
        error: null,
        showPassword: false,
        prevReact: null
    }

    render () {
        let className = 'input-container';
        if(this.state.error) className += ' error';
        if(!this.state.value) className += ' empty';
        if(this.props.reactTo && this.props.reactTo != this.state.prevReact) {
            setTimeout(() => { 
                this.props.onChange(this.state.value, this); 
                this.setState({ prevReact: this.props.reactTo });
            }, 0);
        }

        return (
            <div className={className} style={this.props.style}>
                <div className="input-label">
                    {this.props.icon ? <Icon icon={this.props.icon} /> : null}
                    {this.state.error || this.props.label}
                </div>
                <input type={this.props.type || 'text'} value={this.props.defaultValue} onChange={(e) => {
                    this.setState({ value: e.target.value });
                    if(this.props.onChange) this.props.onChange(e.target.value, this);
                }} />
            </div>
        );
    }

}

export default InputField;