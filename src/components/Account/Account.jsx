import React, { Component } from 'react'
import { Icon, Popup, Button, Image } from 'semantic-ui-react'

import FriendPopup from '../FriendPopup/FriendPopup.jsx'
import Management from './Management.jsx'
import SolicitationsFriends from '../SolicitationsFriends/SolicitationsFriends.jsx'
class Account extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: {
                active: true
            },
            notifications: {
                active: false
            },
            solicitations: {
                active: false,
                friends: [
                    {
                        id: '667',
                        user: '',
                        image: '/public/images/02.avatar.png',
                        favorite: false,
                        online: true
                    }
                ]
            },
            default: (
                <div className="image user">
                    <FriendPopup friend={props.user}>
                        <img
                            className="ui image circular"
                            src={props.user.image}
                        />
                    </FriendPopup>
                </div>
            )
        };

        this._active = this._active.bind(this);
        this._open = this._open.bind(this);
        this.openNotifications = this.openNotifications.bind(this);
        this.openSolicitationsFriends = this.openSolicitationsFriends.bind(this);
        this.onBackHome = this.onBackHome.bind(this);
    }

    static Management = Management;
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
        this.setState({
            user: {...this.state.user, active: false},
            content
        });
    }

    openSolicitationsFriends (event) {
        event.stopPropagation();
        this._open('solicitations', (
            <div className="solicitations">
                <SolicitationsFriends
                    friends={this.state.solicitations.friends}
                />
            </div>
        ));
    }

    openNotifications (event) {
        event.stopPropagation();
        this._open('notifications', (
            <div className="notifications">
                <p>No notifications, yet!</p>
            </div>
        ));
    }

    onBackHome () {
        this.setState({
            user: {...this.state.user, active: true},
            notifications: {...this.state.notifications, active: false},
            solicitations: {...this.state.solicitations, active: false},
            content: this.state.default
        });
    }

    render () {
        const { user, children } = this.props;
        const popupButton = <Icon fitted link name="configure"/>;
        return (
            <div className="App-account">
                <div className="header">
                    <strong>{user.name}</strong>
                    <Popup
                        basic
                        position="bottom right"
                        on="click"
                        trigger={popupButton}
                        >
                        <Popup.Header>Management account</Popup.Header>
                        <Popup.Content>
                            {children}
                        </Popup.Content>
                    </Popup>
                </div>
                <div className="content">
                    {this.state.content}
                    <Button.Group>
                        <Button
                            active={this.state.user.active}
                            title="Back home"
                            onClick={this.onBackHome}
                            icon="home"
                        />
                        <Button
                            color="green"
                            active={this.state.solicitations.active}
                            title="Open friends solicitations"
                            icon={this.state.solicitations.active
                                    ? 'group' : 'add user'}
                            onClick={this.openSolicitationsFriends}
                        />
                        <Button
                            color="blue"
                            active={this.state.notifications.active}
                            title="Open notifications"
                            onClick={this.openNotifications}
                            icon={this.state.notifications.active
                                    ? 'alarm' : 'alarm outline'}
                            />
                    </Button.Group>
                </div>
                <div className="info">
                    <span>You have {user.friends.length} friends</span>
                </div>
            </div>
        );
    }
}

export default Account
