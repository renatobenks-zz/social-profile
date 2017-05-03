import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import FriendMetadata from './FriendMetadata.jsx'
import FriendDescription from './FriendDescription.jsx'
import FriendPopup from '../FriendPopup/FriendPopup.jsx'
class FriendContent extends Component {
    static Description = FriendDescription;
    static Metadata = FriendMetadata;

    render () {
        const { children, messenger, friend, popup } = this.props;
        let content;
        let HeaderContent = children;
        if (!messenger) {
            content = Array.isArray(children) ? [...children] : [children];
            HeaderContent = content.splice(0,1);
        }

        return (
            <Card.Content>
                <Card.Header>
                    {!popup ?  friend.user : (
                        <FriendPopup
                            friend={friend}
                            content={<span>{friend.user}</span>}
                        />
                    )}
                    {HeaderContent}
                </Card.Header>
                {content}
            </Card.Content>
        );
    }
}

export default FriendContent
