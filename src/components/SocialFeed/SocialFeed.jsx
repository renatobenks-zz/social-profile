import React, { Component } from 'react'

import BreadcrumbRoute from '../BreadcrumbRoute/BreadcrumbRoute.jsx'
import Title from '../Title/Title.jsx'
class SocialFeed extends Component {
    render () {
        const { children } = this.props;
        return (
            <div className="App-social">
                <BreadcrumbRoute default />
                <Title title="Status | timeline" icon="browser"/>
                <hr/>
                {children}
            </div>
        );
    }
}

export default SocialFeed
