import React from 'react';

import './MainBlock.css';

class MainBlock extends React.Component {

    render () {
        let className = 'block';
        if(this.props.primary)    className += ' primary';
        if(this.props.minw)       className += ' minw';
        if(this.props.loadAppear) className += ' loadAppear';

        return (<div className={className}>
            {this.props.children}
        </div>);
    }

}

export default MainBlock;