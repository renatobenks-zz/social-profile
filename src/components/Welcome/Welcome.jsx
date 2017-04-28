import React, { Component } from 'react';

class Welcome extends Component {
    render () {
        const { onClose, children } = this.props;
        return (
            <div className="App-Welcome">
                {children}
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

export default Welcome
