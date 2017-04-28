import React, { Component } from 'react';

import Logo from '../Logo/Logo.jsx';
class Company extends Component {
    render () {
        const { logo, children } = this.props;
        return (
            <div className="App-company">
                <Logo logo={logo} />
                { children }
            </div>
        )
    }
}

export default Company
