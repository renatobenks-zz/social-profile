import React, { Component } from 'react';

import banner from '../../../public/images/banner.png';

import Welcome from '../Welcome/Welcome.jsx';
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
        if (!this.state.active) {
            return (
                <div
                    style={this.state.style}
                    className="App-banner non-active"
                />
            )
        }

        return (
            <div className="App-banner active">
                <Welcome onClose={this.onCloseMessage}>
                    <Message
                        title="Bem-vindo à"
                        image={banner}
                        text="PROFILES"
                    />
                </Welcome>
            </div>
        )
    }
}

export default Banner
