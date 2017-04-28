import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'

import Status from '../Status/Status.jsx'
class StatusList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            content: []
        };
    }

    static getEventDate (date) {
        let now = parseInt(new Date().getSeconds(), 10);
        date = parseInt(new Date(date - 1000).getSeconds(), 10); // add 1s
        return now - date;
    }

    componentWillMount () {
        let date = Date.now();
        let { status, friends } = this.props.content;
        this.setState({
            content: status.map(item => {
                date = date - 1000;
                item.user = friends.filter(friend =>
                    friend.user === item.user
                )[0];
                return {
                    ...item,
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
