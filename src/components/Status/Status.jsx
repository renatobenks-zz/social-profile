import React, { Component } from 'react'
import { Feed, Icon } from 'semantic-ui-react'

import FriendPopup from '../FriendPopup/FriendPopup.jsx'
class Status extends Component {
    constructor (props) {
        super(props);
        this.state = {
            status: props.status
        };

        this.activeLike = this.activeLike.bind(this);
    }

    activeLike (e) {
        e.preventDefault();
        const status = {...this.state.status};
        status.like.value = !status.like.active
            ? status.like.value + 1 : status.like.value - 1;
        status.like.active = !status.like.active;
        this.setState({
            status
        });
    }

    render () {
        const { status } = this.state;
        return (
            <Feed.Event>
                <Feed.Label>
                    <FriendPopup
                        friend={status.user}
                        content={<img src={status.user.image} />}
                    />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <FriendPopup friend={status.user}>
                            <Feed.User>
                                {status.user.user}
                            </Feed.User>
                        </FriendPopup>
                        <Feed.Date>{status.date}s ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {status.text}
                    </Feed.Extra>
                    <Feed.Meta>
                        <Feed.Like
                            className={status.like.active ? 'active' : ''}
                            onClick={this.activeLike}
                            >
                            <Icon name="like" />
                            {status.like.value} likes
                        </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
        );
    }
}

export default Status
