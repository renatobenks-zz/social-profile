import React, { Component } from 'react'
import { Card, Button, Image, Icon } from 'semantic-ui-react'

class SolicitationsFriends extends Component {
    constructor (props) {
        super(props);
        this.state = {
            friends: props.friends,
            activeApprove: false,
            activeDecline: false
        };

        this._onClick = this._onClick.bind(this);
        this._onApprove= this._onApprove.bind(this);
        this.onApproveSolicitation = this.onApproveSolicitation.bind(this);
    }

    _onClick (event, {as}, index) {
        event.preventDefault();
        if (as === 'Approve') {
            setTimeout(() => this.onApproveSolicitation(index), 1000);
            this.setState({
                activeApprove: true
            });
        } else this._onApprove(index);
    }

    _onApprove (index) {
        const { friends } = this.state;
        const friend = friends.splice(index, 1);
        this.setState({
            friends
        });

        return {...friend};
    }

    onApproveSolicitation (index) {
        const friend = this._onApprove(index);
        this.props.onApproveFriend({...friend[0]});
        this.setState({
            activeApprove: !this.state.activeApprove
        });
    }

    render () {
        const { friends, activeApprove, activeDecline } = this.state;

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
                            className={'animated '.concat(activeApprove
                                ? 'rollOut' : null)}
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
                                        active={activeApprove}
                                        color="green"
                                        icon="checkmark"
                                        content="Approve"
                                        as="Approve"
                                        onClick={(e, props) =>
                                            this._onClick(e,props,i)}
                                    />
                                    <Button
                                        toggle
                                        active={activeDecline}
                                        color="red"
                                        icon="minus"
                                        content="Decline"
                                        as="Decline"
                                        onClick={(e, props) =>
                                            this._onClick(e,props,i)}
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
