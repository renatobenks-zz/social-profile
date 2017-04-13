import React, { Component } from 'react';

class Message extends Component {
    render () {
        const { title, image, text } = this.props;
        return (
            <div className="App-message animated bounceInDown">
                <h1>{title}</h1>
                <img
                    src={image}
                    width="100%"
                    height="auto"
                    alt="Banner"
                    title="Banner"
                />
                <h3>{text}</h3>
            </div>
        )
    }
}

export default Message
