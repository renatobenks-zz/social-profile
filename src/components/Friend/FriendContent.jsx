import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import FriendMetadata from './FriendMetadata.jsx'
import FriendDescription from './FriendDescription.jsx'
class FriendContent extends Component {
    static Description = FriendDescription;
    static Metadata = FriendMetadata;

    render () {
        const { children, messenger, friend } = this.props;
        let content;
        let HeaderContent = children;
        if (!messenger) {
            content = Array.isArray(children) ? [...children] : [children];
            HeaderContent = content.splice(0,1);
        }

        return (
            <Card.Content>
                <Card.Header>
                    {friend.user ? friend.user : 'Desconhecido'}
                    {HeaderContent}
                </Card.Header>
                {content}
            </Card.Content>
        );
    }
}

export default FriendContent
