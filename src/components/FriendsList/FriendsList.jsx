import React, { Component } from 'react'
import { Grid, Image, Icon, Button } from 'semantic-ui-react'

import { ENDPOINTS } from '../../constants'
import { FETCH_REQUEST } from '../../middlewares/callAPImiddleware'

import Friend from '../Friend/Friend.jsx'
class FriendsList extends Component {
    constructor (props) {
        super(props);
        const { friends, limit, favoritesOnly } = props;
        this.state = {
            friends: friends.data,
            friendsNumber: friends.pageSize,
            pageNumber: friends.pageNumber,
            allIn: Math.ceil(friends.totalRows/friends.pageSize) === friends.pageNumber,
            favoritesOnly: favoritesOnly || false,
            limit: limit || 3,
            showMore: {
                active: false,
                loading: false
            }
        };

        this._activeButton = this._activeButton.bind(this);
        this.getMoreFriends = this.getMoreFriends.bind(this);
        this.showMoreFriends = this.showMoreFriends.bind(this);
        this.onFavorite = this.onFavorite.bind(this);
    }

    static getRandomDate () {
        return new Date(+(new Date()) - Math.floor(Math.random()*10000000000));
    }

    static filterFavoritesFriends ({friends}) {
        return friends.filter(friend => friend.favorite)
    }

    static filterFriendsWithLimit ({friends, limit}) {
        return friends.filter((friend, index) => index < limit);
    }

    static _get () {
        ENDPOINTS.FRIENDS.params.pageNumber++;
        return FETCH_REQUEST(ENDPOINTS.FRIENDS.get_endpoint());
    }

    componentWillMount () {
        let { friends, favoritesOnly } = this.state;
        const date = FriendsList.getRandomDate();
        if (favoritesOnly)
            friends = FriendsList.filterFavoritesFriends({friends});
        this.setState({
            friends: friends.map(friend => ({
                ...friend,
                date: [date.getDate(), date.getMonth()+1, date.getFullYear()]
                    .join('/')
            }))
        });
    }

    componentDidMount () {
        const { friends, limit } = this.state;
        this.setState({
            friends: FriendsList.filterFriendsWithLimit({
                friends,
                limit
            })
        });
    }

    async getMoreFriends () {
        const { allIn } = this.state;
        const friendsID = this.state.friends.map(friend => friend.id);
        let { friends } = this.props;
        friends = Promise.resolve({
            ...friends,
            data: friends.data.filter(item => {
                return !friendsID.includes(item.id);
            })
        });

        if (!allIn) friends = FriendsList._get()
            .then(friends => ({
                ...friends,
                pageSize: this.state.friendsNumber,
                pageNumber: this.state.pageNumber+1
            }));

        return await friends.then(friends => ({
            ...friends,
            data: friends.data.length <= 0 ? friends.data :
                friends.data.map(friend => ({
                    ...friend,
                    user:  friend.user || friend.name || 'Desconhecido',
                    image: friend.image || friend.avatar || '/public/images/02.avatar.png'
                }))
        }));
    }

    _activeButton ({as}) {
        const button = this.state[as];
        this.setState({
            [as]: {
                active: !button.active,
                loading: !button.loading
            }
        });
    }

    showMoreFriends (event, {as}) {
        event.preventDefault();
        this._activeButton({as});
        setTimeout(() => {
            this.getMoreFriends()
                .then(friendsToAdd => {
                    let { limit, friends, favoritesOnly } = this.state;
                    this._activeButton({as});
                    if (favoritesOnly)
                        friends = FriendsList.filterFavoritesFriends({
                            friends: friendsToAdd.data
                        });

                    return {
                        limit: limit*2,
                        pageNumber: friendsToAdd.pageNumber,
                        friends: friends
                            .concat(FriendsList.filterFriendsWithLimit({
                                limit,
                                friends: friendsToAdd.data
                            }))
                    };
                })
                .then(({limit, pageNumber, friends}) =>
                    this.setState({
                        limit,
                        pageNumber,
                        friends
                    })
                );
        }, 1500);
    }

    onFavorite (event, id) {
        event.preventDefault();
        const { friends } = this.state;
        this.setState({
            friends: friends.map(friend => {
                return friend.id === id
                    ? {...friend, favorite: !friend.favorite} : friend;
            })
        });
    }

    render () {
        const { friends, showMore } = this.state;
        return (
            <div className="App-friends">
                <Grid>
                    {friends.map(friend => {
                        return (
                            <Grid.Row key={friend.id}>
                                <Friend>
                                    <Image
                                        centered
                                        size="small"
                                        src={friend.image}
                                    />
                                    <Friend.Content friend={friend}>
                                        <div className="icons">
                                            <Icon
                                                color={friend.online
                                                    ? 'green' : 'grey'}
                                                name="circle"
                                            />
                                            <Icon
                                                className={friend.favorite
                                                    ? 'active' : null}
                                                name={friend.favorite
                                                    ? 'star' : 'empty star'}
                                                onClick={(event) =>
                                                    this.onFavorite(event, friend.id)}
                                            />
                                        </div>
                                        <Friend.Content.Description>
                                            {friend.user} biography
                                        </Friend.Content.Description>
                                        <Friend.Content.Metadata>
                                            Developer
                                        </Friend.Content.Metadata>
                                    </Friend.Content>
                                    <Friend.Extra>
                                        Last updated was in {friend.date}
                                    </Friend.Extra>
                                </Friend>
                            </Grid.Row>
                        );
                    })}
                    <Grid.Row className="message">
                        <Grid.Column width="9">
                            <p>We've showing {friends.length} friends.</p>
                        </Grid.Column>
                        <Grid.Column width="7">
                            <Button
                                primary
                                toggle
                                as="showMore"
                                floated="right"
                                animated="fade"
                                active={showMore.active}
                                loading={showMore.loading}
                                tabIndex={1}
                                onClick={this.showMoreFriends}
                                >
                                <Button.Content visible>
                                    Show more
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="ellipsis horizontal" />
                                </Button.Content>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default FriendsList
