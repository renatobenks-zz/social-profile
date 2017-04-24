import React, { Component } from 'react'
import { Icon, Popup } from 'semantic-ui-react'

import Management from './Management.jsx'
class Account extends Component {
    static Management = Management;
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
                <div className="image">
                    <img
                        className="ui image circular"
                        src="/public/images/02.avatar.png"
                    />
                </div>
                <div className="info">
                    <span>{user.friends.length} friends</span>
                </div>
            </div>
        );
    }
}

export default Account
