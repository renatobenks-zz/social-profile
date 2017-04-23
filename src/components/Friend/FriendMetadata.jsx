import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class FriendMetaData extends Component {
    render () {
        const { children } = this.props;
        return (
            <Card.Meta>
                {children}
            </Card.Meta>
        )
    }
}

export default FriendMetaData
