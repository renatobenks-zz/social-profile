import React, { Component } from 'react';

import banner from '../../../public/images/banner.png';
class Message extends Component {
    render () {
        const { onClose } = this.props;
        return (
            <div className="App-message animated bounceInDown">
                <h1>Bem-vindo à</h1>
                <img
                    src={banner}
                    width="100%"
                    height="auto"
                    alt="Banner"
                    title="Banner"
                />
                <h3>PROFILE</h3>
                <button
                    type="button"
                    onClick={onClose}
                    >
                    continuar
                </button>
            </div>
        )
    }
}

export default Message
