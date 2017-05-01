import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

import BreadcrumbRoute from '../BreadcrumbRoute/BreadcrumbRoute.jsx'
import Title from '../Title/Title.jsx'
class SocialFeed extends Component {
    render () {
        const { children } = this.props;
        return (
            <div className="App-social">
                <BreadcrumbRoute default />
                <h1><Icon name="browser" /> Status | timeline</h1>
                <hr/>
                {children}
                <p>
                    No more content, <strong>sign to the top</strong>
                    <Button basic inverted animated="vertical">
                        <Button.Content visible>
                            <Icon color="grey" name="angle up" />
                        </Button.Content>
                        <Button.Content hidden>
                            <Icon color="grey" name="double angle up" />
                        </Button.Content>
                    </Button>
                </p>
            </div>
        );
    }
}

export default SocialFeed
