import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class FriendExtra extends Component {
    render () {
        const { children } = this.props;
        return (
            <Card.Content extra>
                {children}
            </Card.Content>
        )
    }
}

export default FriendExtra
