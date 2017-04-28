import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class FriendDescription extends Component {
    render () {
        const { children } = this.props;
        return (
            <Card.Description>
                {children}
            </Card.Description>
        );
    }
}

export default FriendDescription
