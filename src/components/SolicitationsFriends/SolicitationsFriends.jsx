import React, { Component } from 'react'
import { Card, Button, Image, Icon } from 'semantic-ui-react'

class SolicitationsFriends extends Component {
    constructor (props) {
        super(props);
        this.state = {
            friends: props.friends
        };

        this._removes = this._removes.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onApprove= this._onApprove.bind(this);
        this._onDecline = this._onDecline.bind(this);
        this.onApproveSolicitation = this.onApproveSolicitation.bind(this);
    }

    _removes (index) {
        const { friends } = this.state;
        const friend = friends.splice(index, 1);
        setTimeout(() => {
            this.setState({friends});
        }, 1000);
        return {...friend};
    }

    _onClick (event, index, callBack) {
        event.preventDefault();
        const { friends } = this.state;
        callBack(index, friends);
    }

    _onApprove (index, friends) {
        this.setState({
            friends: friends.map((friend, i) =>
                index === i ? {...friend, approved: true } : friend
            )
        });

        this.onApproveSolicitation(this._removes(index));
    }

    _onDecline (index, friends) {
        this.setState({
            friends: friends.map((friend, i) =>
                index === i ? {...friend, declined: true } : friend
            )
        });

        this._removes(index);
    }

    onApproveSolicitation (friend) {
        delete friend[0].approved;
        this.props.onApproveFriend({...friend[0]});
    }

    render () {
        const { friends } = this.state;
        if (!Array.isArray(friends) || friends.length < 1) {
            return (
                <div className="solicitations">
                    <Icon color="grey" size="big" name="group"/>
                    <p>No pendents friends solicitations</p>
                </div>
            );
        }

        return (
            <Card.Group>
                {friends.map((friend, i) => {
                    friend.user = friend.user ? friend.user : 'Desconhecido';
                    return (
                        <Card
                            className={'animated '.concat(friend.approved
                                ? 'rollOut' : friend.declined
                                    ? 'bounceOutLeft' : null)}
                            style={{textAlign: 'left'}}
                            key={friend.id}
                            >
                            <Card.Content>
                                <Button
                                    compact
                                    inverted
                                    floated="right"
                                    animated={true}
                                    >
                                    <Button.Content visible>
                                        <Image
                                            shape="circular"
                                            size="mini"
                                            src={friend.image}
                                        />
                                    </Button.Content>
                                    <Button.Content hidden>
                                        <Icon
                                            link
                                            name="empty star"
                                        />
                                    </Button.Content>
                                </Button>
                                <Card.Header>
                                    {friend.user}
                                </Card.Header>
                                <Card.Meta>
                                    {friend.online ? 'Online': 'Offline'}
                                    <Icon
                                        size="small"
                                        color={friend.online
                                            ? 'green' : 'grey'}
                                        name="circle"
                                    />
                                </Card.Meta>
                                <Card.Description>
                                    {friend.user} wants to add you
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button.Group>
                                    <Button
                                        toggle
                                        active={friend.approved || false}
                                        color="green"
                                        icon="checkmark"
                                        content="Approve"
                                        as="Approve"
                                        onClick={(e) =>
                                            this._onClick(
                                                e,
                                                i,
                                                this._onApprove)}
                                    />
                                    <Button
                                        toggle
                                        active={friend.declined || false}
                                        color="red"
                                        icon="minus"
                                        content="Decline"
                                        as="Decline"
                                        onClick={(e) =>
                                            this._onClick(
                                                e,
                                                i,
                                                this._onDecline)}
                                    />
                                </Button.Group>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        );
    }
}

export default SolicitationsFriends
