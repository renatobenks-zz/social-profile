import React, { Component } from 'react'
import { Card, Button, Image } from 'semantic-ui-react'

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
                {friends.map(friend => (
                    <Card key={friend.id}>
                        <Card.Content>
                            <Image floated='right' size='mini' src={friend.image} />
                            <Card.Header>
                                {friend.user ? friend.user : 'Desconhecido'}
                            </Card.Header>
                            <Card.Meta>
                                Friends of Elliot
                            </Card.Meta>
                            <Card.Description>
                                Steve wants to add you to the group <strong>best friends</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button basic color='green'>Approve</Button>
                                <Button basic color='red'>Decline</Button>
                            </div>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        );
    }
}

export default SolicitationsFriends
