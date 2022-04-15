import React from 'react';
import { Icon } from '@iconify/react';

import './DialogBox.css';

class DialogBox extends React.Component {

    state = {
        visible: !!this.props.visible,
        closing: false
    }

    render() {
        if(this.props.propBased ? !this.props.visible : !this.state.visible) return;


        let className = 'dialog-box';
        if(this.state.closing) className += ' closing';
        
        return (
            <div className={className}>
            <div className="dialog-box-content">
                <div className="dialog-box-header">
                    <div className="dialog-box-title">{this.props.title}</div>
                    <div className="dialog-box-close" onClick={() => {
                        this.props.onClose(this);
                        this.setState({ visible: false });
                    }}>
                    <Icon icon="uil:times" fontSize={20} />
                    </div>
                </div>
                <div className="dialog-box-body">
                    {this.props.children}
                </div>
            </div>
            </div>
        );
    }

}

export default DialogBox;