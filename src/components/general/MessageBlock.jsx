import React from 'react';
import MainBlock from '../website/MainBlock';

class MessageBlock extends React.Component {
    render () {
        return (
            <center className="fullh">
                <MainBlock minw={this.props.minw} loadAppear={this.props.loadAppear}>
                    <h1 className="accent">{this.props.heading}</h1>
                    <p>{this.props.description}</p>
                    <p className="primary"><b>{this.props.caption}</b></p>
                </MainBlock>
            </center>
        );
    }
};

export default MessageBlock;
