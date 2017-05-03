import React, { Component } from 'react'
import { Button, Image, Icon } from 'semantic-ui-react'

import FriendPopup from '../FriendPopup/FriendPopup.jsx'
import ManagementAccount from './ManagementAccount.jsx'
import SolicitationsFriends from '../SolicitationsFriends/SolicitationsFriends.jsx'
class Account extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: {
                active: true,
                ...props.user
            },
            notifications: {
                active: false,
                alerts: []
            },
            solicitations: {
                active: false,
                friends: [
                    {
                        id: '667',
                        user: 'New Braga',
                        image: '/public/images/02.avatar.png',
                        favorite: true,
                        online: true
                    }, {
                        id: '668',
                        user: 'Old Braga',
                        image: '/public/images/02.avatar.png',
                        favorite: false,
                        online: true
                    }
                ]
            },
            default: (
                <div className="image user">
                    <FriendPopup friend={props.user}>
                        <Image shape="circular" src={props.user.image}/>
                    </FriendPopup>
                </div>
            )
        };

        this._active = this._active.bind(this);
        this._open = this._open.bind(this);
        this.openNotifications = this.openNotifications.bind(this);
        this.openSolicitationsFriends = this.openSolicitationsFriends.bind(this);
        this.onBackHome = this.onBackHome.bind(this);

        this.onUpdateContent = this.onUpdateContent.bind(this);
        this.onApproveFriend = this.onApproveFriend.bind(this);
    }

    componentWillMount () {
        this.setState({
            content: this.state.default
        });
    }

    _active (item, prop) {
        const { active } = item;
        const items = {...this.state};
        for (let item in items) {
            if (items[item].active === undefined) delete items[item];
            else items[item].active = false;
        }

        this.setState({
            ...items,
            [prop]: {...item, active: !active}
        });
    }

    _open (item, content) {
        const origin = item;
        item = {...this.state[item]};
        const { active } = item;
        if (active) return this.onBackHome();
        this._active(item, origin);
        this.setState({content});
    }

    openSolicitationsFriends (event) {
        event.stopPropagation();
        this._open('solicitations', (
            <SolicitationsFriends
                onApproveFriend={this.onApproveFriend}
                friends={this.state.solicitations.friends}
            />
        ));
    }

    openNotifications (event) {
        event.stopPropagation();
        this._open('notifications', (
            <div className="notifications">
                <Icon color="grey" size="big" name="alarm" />
                <p>No notifications, yet!</p>
            </div>
        ));
    }

    onBackHome () {
        const { notifications, solicitations } = this.state;
        notifications.active = false;
        solicitations.active = false;
        this.setState({
            user: {...this.state.user, active: true},
            solicitations,
            notifications,
            content: this.state.default
        });
    }

    onUpdateContent (content=null) {
        if (content)
            this.setState({
                content
            });
    }

    onApproveFriend (friend) {
        this.props.onAddFriend(friend);
    }

    render () {
        const { user, solicitations, notifications } = this.state;
        return (
            <div className="App-account">
                <div className="header">
                    <strong>{user.name}</strong>
                    <ManagementAccount
                        onUpdateContent={this.onUpdateContent}
                        password
                    />
                </div>
                <div className="content">
                    {this.state.content}
                    <Button.Group>
                        <Button
                            basic
                            color={user.active ? 'black' : 'grey'}
                            icon="home"
                            title="Back home"
                            onClick={this.onBackHome}
                        />
                        <Button
                            basic
                            color="green"
                            title="Open friends solicitations"
                            active={solicitations.active}
                            icon={solicitations.active
                                    ? 'group' : 'add user'}
                            content={solicitations.friends.length}
                            onClick={this.openSolicitationsFriends}
                        />
                        <Button
                            basic
                            color="blue"
                            active={notifications.active}
                            title="Open notifications"
                            icon={notifications.active
                                ? 'alarm' : 'alarm outline'}
                            content={notifications.alerts.length}
                            onClick={this.openNotifications}
                            />
                    </Button.Group>
                </div>
                <div className="info">
                    <span>You have {user.friends.data.length} friends</span>
                </div>
            </div>
        );
    }
}

export default Account
