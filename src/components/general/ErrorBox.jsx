import React from 'react';
import { Icon } from '@iconify/react';

import './ErrorBox.css';

class ErrorBox extends React.Component {

    render () {
        return (
            <div className={"error-box " + this.props.className || ""}>
                <Icon icon="uil:exclamation-circle" fontSize={20} />
                {this.props.text}
            </div>
        );
    }

}

export default ErrorBox;