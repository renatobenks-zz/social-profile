import React, { Component } from 'react';

class Logo extends Component {
    render () {
        return (
            <a href="/">
                <img
                    src={this.props.logo}
                    className="App-logo"
                    alt="Logo"
                    title="CodeRockr"
                />
            </a>
        );
    }
}

export default Logo
