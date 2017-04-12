import React, { Component } from 'react';

class Content extends Component {
    render () {
        const { children } = this.props;
        return (
            <div className='App-content'>
                { children }
            </div>
        )
    }
}

export default Content
