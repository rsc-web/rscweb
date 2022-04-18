import React from 'react';
import { Icon } from '@iconify/react';

import './InputField.css';

class InputField extends React.Component {

    state = {
        value: this.props.defaultValue || '',
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

        let onInputChane = (e) => {
            this.setState({ value: e.target.value });
            if(this.props.onChange) this.props.onChange(e.target.value, this);
        }

        return (
            <div className={className} style={this.props.style}>
                <div className="input-label">
                    {this.props.icon ? <Icon icon={this.props.icon} /> : null}
                    {this.state.error || this.props.label}
                </div>
                { this.props.type == 'textarea' ?
                    <textarea defaultValue={this.props.defaultValue} onChange={onInputChane} /> :    
                    <input type={this.props.type || 'text'} defaultValue={this.props.defaultValue} onChange={onInputChane} />
                }
                
            </div>
        );
    }

}

export default InputField;