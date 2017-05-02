import React, { Component } from 'react'
import { Popup, Image, Icon } from 'semantic-ui-react'

import Friend from '../Friend/Friend.jsx'
class FriendPopup extends Component {
    render () {
        const { friend, content, children } = this.props;
        return (
            <Popup
                position="top left"
                trigger={children ? children : content}
                >
                <Popup.Content>
                    <Friend>
                        <Image centered size="small" src={friend.image}/>
                        <Friend.Content friend={friend}>
                            {friend.favorite
                                ? <Icon className="active" name="star" />
                                : null}
                            <Friend.Content.Description>
                                {friend.user} biography
                            </Friend.Content.Description>
                            <Friend.Content.Metadata>
                                Developer
                            </Friend.Content.Metadata>
                        </Friend.Content>
                        <Friend.Extra>
                            {friend.online ? 'Online' : 'Offline' }
                            <Icon
                                color={friend.online ? 'green' : 'grey'}
                                name="circle"
                            />
                        </Friend.Extra>
                    </Friend>
                </Popup.Content>
            </Popup>
        );
    }
}

export default FriendPopup
