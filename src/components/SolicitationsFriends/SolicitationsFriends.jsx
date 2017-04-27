import React, { Component } from 'react'
import { Card, Button, Image, Icon } from 'semantic-ui-react'

class SolicitationsFriends extends Component {
    constructor (props) {
        super(props);
        this.state = {
            friends: props.friends
        };
    }

    render () {
        const { friends } = this.state;
        return (
            <Card.Group>
                {friends.map(friend => {
                    friend.user = friend.user ? friend.user : 'Desconhecido';
                    return (
                        <Card style={{textAlign: 'left'}} key={friend.id}>
                            <Card.Content>
                                <Image
                                    floated="right"
                                    size="mini"
                                    src={friend.image}
                                />
                                <Card.Header>
                                    {friend.user}
                                </Card.Header>
                                <Card.Meta>
                                    Add <Icon link name="add"/>
                                </Card.Meta>
                                <Card.Description>
                                    {friend.user} wants to add you
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button.Group fluid>
                                    <Button basic color='green'>Approve</Button>
                                    <Button basic color='red'>Decline</Button>
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
