import React, { Component } from 'react'
import { Grid, Image, Icon } from 'semantic-ui-react'

import Friend from '../Friend/Friend.jsx'
class FriendsList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            friends: []
        };
    }

    static getRandomDate () {
        return new Date(
            +(new Date()) - Math.floor(Math.random()*10000000000)
        );
    }

    componentWillMount () {
        this.setState({
            friends: this.props.friends.filter(
                friend => friend.favorite
            )
        });
    }

    render () {
        const { friends } = this.state;
        friends.splice(3, friends.length - 3);
        return (
            <div className="App-friends">
                <Grid>
                    {friends.map(friend => {
                        let date = FriendsList.getRandomDate();
                        date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                        return (
                            <Grid.Row key={friend.id}>
                                <Friend>
                                    <Image src={friend.image} />
                                    <Friend.Content friend={friend}>
                                        <div className="icons">
                                            <Icon color="grey" name="circle" />
                                            <Icon className="active" name="star" />
                                        </div>
                                        <Friend.Content.Description>
                                            {friend.user} biography
                                        </Friend.Content.Description>
                                        <Friend.Content.Metadata>
                                            Developer
                                        </Friend.Content.Metadata>
                                    </Friend.Content>
                                    <Friend.Extra>
                                        Last updated was in {date}
                                    </Friend.Extra>
                                </Friend>
                            </Grid.Row>
                        );
                    })}
                </Grid>
            </div>
        )
    }
}

export default FriendsList
