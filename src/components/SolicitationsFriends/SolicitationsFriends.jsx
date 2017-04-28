import React, { Component } from 'react'
import { Card, Button, Image, Icon } from 'semantic-ui-react'

class SolicitationsFriends extends Component {
    constructor (props) {
        super(props);
        this.state = {
            friends: props.friends
        };

        this._onClick = this._onClick.bind(this);
        this._onApprove= this._onApprove.bind(this);
        this.onApproveSolicitation = this.onApproveSolicitation.bind(this);
    }

    _onClick (event, {as}, index) {
        event.preventDefault();
        if (as) this.onApproveSolicitation(this._onApprove(index));
    }

    _onApprove (index) {
        const { friends } = this.state;
        let friend = friends.splice(index, 1);
        this.setState({friends});
        return {...friend};
    }

    onApproveSolicitation (friend) {
        this.props.onApproveFriend({...friend[0]});
    }

    //TODO: action callback to decline
    onDeclineSolicitation (friend) {
        console.log(this.state.friends[friends.indexOf(friend)]);
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
                        <Card style={{textAlign: 'left'}} key={friend.id}>
                            <Card.Content>
                                <Button
                                    floated="right"
                                    inverted
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
                                            name="user add"
                                        />
                                    </Button.Content>
                                </Button>
                                <Card.Header>
                                    {friend.user}
                                </Card.Header>
                                <Card.Meta>
                                    {friend.online ? 'Online': 'Offline'}
                                    <Icon
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
                                <Button.Group fluid>
                                    <Button
                                        basic
                                        color="green"
                                        icon="checkmark"
                                        content="Approve"
                                        as="approve"
                                        onClick={(e, props) =>
                                            this._onClick(e,props,i)}
                                    />
                                    <Button
                                        basic
                                        color="red"
                                        icon="minus"
                                        content="Decline"
                                        as={null}
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
