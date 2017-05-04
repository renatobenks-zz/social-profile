import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

import Friend from '../Friend/Friend.jsx'
class Messenger extends Component {
    constructor (props) {
        super(props);
        this.state = {
            friends: props.friends
        };

        this.onUpdateFriendStatus = this.onUpdateFriendStatus.bind(this);
    }

    componentWillMount () {
        const { friends } = this.props;
        this.setState({
            friends: friends.map(friend => ({
                ...friend,
                online: friend.online || false
            }))
        });
    }

    componentDidMount () {
        this.interval = setInterval(this.onUpdateFriendStatus, 60000);
    }

    componentWillReceiveProps () {
        this.componentWillMount();
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    onUpdateFriendStatus () {
        const { friends } = this.state;
        this.props.activeUsersOnline({
            friends: friends.map((friend, index) => ({
                ...friend,
                online: index === Math.floor(Math.random()*((friends.length-1)+1))
            }))
        });
    }

    render () {
        const { friends } = this.state;
        return (
            <div className="App-messenger">
                <Card.Group>
                    {friends.map(friend =>
                        <Friend key={friend.id} messenger>
                            <Friend.Content popup friend={friend} messenger>
                                <Image
                                    floated="left"
                                    avatar
                                    src={friend.image}
                                    shape="circular"
                                />
                                <Icon
                                    color={friend.online ? 'green' : 'grey'}
                                    name="circle"
                                />
                                {friend.favorite ?
                                    <Icon className="active" name="star" /> : ''
                                }
                            </Friend.Content>
                        </Friend>
                    )}
                </Card.Group>
            </div>
        )
    }
}

export default Messenger
