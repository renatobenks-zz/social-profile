import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'

import Status from '../Status/Status.jsx'
class StatusList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            content: props.content.status
        };

        this.getFriendFromStatus = this.getFriendFromStatus.bind(this);
    }

    static getEventDate (date) {
        let now = parseInt(new Date().getSeconds(), 10);
        date = parseInt(new Date(date - 1000).getSeconds(), 10); // add 1s
        return now - date;
    }

    getFriendFromStatus (user) {
        const { friends } = this.props.content;
        const friend = friends.filter(friend => friend.user === user);
        if (friend.length <= 0 || !user)
            return {user: 'Desconhecido', image: '/public/images/02.avatar.png'};
        return {...friend[0]}
    }

    componentWillMount () {
        let date = Date.now();
        let { content } = this.state;
        this.setState({
            content: content.map(item => {
                date = date - 1000;
                return {
                    ...item,
                    user: this.getFriendFromStatus(item.user),
                    date: String(StatusList.getEventDate(date)),
                    like: {
                        value: 0,
                        active: false
                    }
                };
            })
        });
    }

    render () {
        const { content } = this.state;
        return (
            <Feed>
                {content.map(status =>
                    <Status key={status.id} status={status} />
                )}
            </Feed>
        );
    }
}

export default StatusList
