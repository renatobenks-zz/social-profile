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
                online: !!friend.online
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
        const friend = friends
            [Math.floor(Math.random()*((friends.length-1)+1))];
        friend.online = !friend.online;

        this.setState({
            friends: [...friends]
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
