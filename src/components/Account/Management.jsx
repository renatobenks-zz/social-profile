import React, { Component } from 'react'

class Management extends Component {
    render () {
        const { children } = this.props;
        return (
            <div className="Account-management">
                {children}
                <button className="ui button secondary">Account</button>
                <button className="ui button primary">Friends</button>
            </div>
        );
    }
}

export default Management
