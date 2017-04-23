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
        this.setState({
            friends: this.state.friends.map(friend => ({
                ...friend,
                online: false
            }))
        });
    }

    componentDidMount () {
        this.interval = setInterval(this.onUpdateFriendStatus, 60000);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    onUpdateFriendStatus () {
        this.setState({
            friends: this.state.friends.map((friend, index) => {
                if (index === Math.floor(Math.random()*((this.state.friends.length-1)+1)))
                    friend.online = !friend.online;
                return {...friend}
            })
        });
    }

    render () {
        const { friends } = this.state;
        return (
            <div className="App-messenger">
                <Card.Group>
                    {friends.map(friend =>
                        <Friend key={friend.id} messenger>
                            <Friend.Content friend={friend} messenger>
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
                            </Friend.Content>
                        </Friend>
                    )}
                </Card.Group>
            </div>
        )
    }
}

export default Messenger
