import React, { Component } from 'react'
import { Icon, Popup, Button, Image } from 'semantic-ui-react'

import FriendPopup from '../FriendPopup/FriendPopup.jsx'
import Management from './Management.jsx'
import SolicitationsFriends from '../SolicitationsFriends/SolicitationsFriends.jsx'
class Account extends Component {
    constructor (props) {
        super(props);
        this.state = {
            solicitations: {
                friends: [
                    {id: '667', user: '', image: '/public/images/02.avatar.png'}
                ]
            },
            notifications: {
                active: false
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

        this.activeNotifications = this.activeNotifications.bind(this);
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

    activeNotifications () {
        this.setState(({notifications}) => ({
            notifications: {
                active: !notifications.active
            }
        }));
    }

    openSolicitationsFriends (event) {
        event.stopPropagation();
        if (this.state.content !== this.state.default)
            this.onBackHome();
        this.setState({
            content: (
                <SolicitationsFriends friends={this.state.solicitations.friends} />
            )
        });
    }

    openNotifications (event) {
        event.stopPropagation();
        this.activeNotifications();
        this.setState(({notifications}) => {
            if (!notifications.active)
                return {content: this.state.default};
            return {
                content: (
                    <div className="notifications">
                        <p>No notifications, yet!</p>
                    </div>
                )
            };
        });
    }

    onBackHome () {
        this.setState({
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
                            title="Back home"
                            onClick={this.onBackHome}
                            icon="home"
                        />
                        <Button
                            title="Open friends solicitations"
                            icon="add user"
                            onClick={this.openSolicitationsFriends}
                        />
                        <Button
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
