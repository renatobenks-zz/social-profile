import React, { Component } from 'react';

import Message from '../Welcome/Message.jsx';
class Banner extends Component {
    constructor (props) {
        super(props);
        this.state = {
            active: true
        };

        this.onCloseMessage = this.onCloseMessage.bind(this);
    }

    onCloseMessage (e) {
        e.preventDefault();
        this.setState({
            active: false
        });

        setTimeout(() => {
            this.setState({
                style: {
                    position: 'relative'
                }
            });
        }, 1500);
    }

    render () {
        const classBanner = String.prototype.concat(
            'App-banner',
            this.state.active ? ' active' : ' non-active',
        );

        return (
            <div style={this.state.style} className={classBanner}>
                {this.state.active
                    ? <Message onClose={this.onCloseMessage} />
                    : ''
                }
            </div>
        )
    }
}

export default Banner
