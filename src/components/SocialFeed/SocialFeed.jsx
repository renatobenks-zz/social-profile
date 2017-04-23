import React, { Component } from 'react'
import { Feed, Icon } from 'semantic-ui-react'

import BreadcrumbRoute from '../BreadcrumbRoute/BreadcrumbRoute.jsx'
class SocialFeed extends Component {
    constructor (props) {
        super(props);
        this.state = {
            content: []
        };

        this.activeLike = this.activeLike.bind(this);
    }

    static getEventDate (date) {
        let now = parseInt(new Date().getSeconds(), 10);
        date = parseInt(new Date(date - 1000).getSeconds(), 10); // add 1s
        return now - date;
    }

    componentWillMount () {
        let date = Date.now();
        const { content } = this.props;
        let { status, friends } = content;
        this.setState({
            content: status.map(item => {
                date = date - 1000;
                item.user = friends.filter(friend =>
                    friend.user === item.user
                )[0];
                return {
                    ...item,
                    date: String(SocialFeed.getEventDate(date)),
                    like: {
                        value: 0,
                        active: false
                    }
                };
            })
        });
    }

    activeLike (id) {
        this.setState({
            content: this.state.content
                .map(item => {
                    if (item.id === id) {
                        item.like.value = !item.like.active
                            ? item.like.value+1 : item.like.value-1;
                        item.like.active = !item.like.active;
                    }
                    return {...item}
                })
        });
    }

    render () {
        const { content } = this.state;
        return (
            <div className="App-social">
                <BreadcrumbRoute default />
                <h1><Icon name="browser"/>Timeline</h1>
                <hr/>
                <Feed>
                    {content.map(item =>
                        <Feed.Event key={item.id}>
                            <Feed.Label>
                                <img src={item.user.image} />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary>
                                    <Feed.User>{item.user.user}</Feed.User>
                                    <Feed.Date>{item.date}s ago</Feed.Date>
                                </Feed.Summary>
                                <Feed.Extra text>
                                    {item.text}
                                </Feed.Extra>
                                <Feed.Meta>
                                    <Feed.Like
                                        className={item.like.active ? 'active' : ''}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            return this.activeLike(item.id);
                                        }}
                                        >
                                        <Icon name="like" />
                                        {item.like.value} likes
                                    </Feed.Like>
                                </Feed.Meta>
                            </Feed.Content>
                        </Feed.Event>
                    )}
                </Feed>
            </div>
        )
    }
}

export default SocialFeed
