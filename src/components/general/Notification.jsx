import React from 'react';
import { Icon } from '@iconify/react';

import './Notification.css';

class Notification extends React.Component {

    state = {
        show: false
    }

    componentDidMount () {
        if (!this.props.oneTime || !localStorage.getItem(`showNotif${this.props.id}`)) {
            this.setState({ show: true });
        }
    }

    markAsRead () {
        if (this.props.oneTime) localStorage.setItem(`showNotif${this.props.id}`, true);
    }

    close () {
        this.markAsRead();
        this.setState({ show: false });
    }

    render () {
        let className = 'notification';
        if (this.props.warning) className += ' warning';
        if (this.props.error) className += ' error';
        if (this.props.success) className += ' success';

        return (this.state.show ? <div className={className}>
            {this.props.icon ? <img src={this.props.icon} /> : null}
            <p>{this.props.message}</p>
            {this.props.button ? <button 
                disabled={this.props.loading} 
                onClick={() => { this.props.button.onClick(this) }}
            >{this.props.loading ? 'Загрузка...' : this.props.button.text}</button> : null}
            {this.props.close ? <Icon className="notification-close" icon="uil:times" onClick={() => {
                this.close();
             }} /> : null}
        </div> : null);
    }

}

export default Notification;