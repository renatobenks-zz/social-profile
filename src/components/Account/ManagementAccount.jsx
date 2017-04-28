import React, { Component } from 'react'
import { Popup, Button, Icon, Image } from 'semantic-ui-react'

import PasswordManagement from './PasswordManagement.jsx'
class ManagementAccount extends Component {
    constructor (props) {
        super(props);
        this.state = {
            password: props.password || false,
            configure: props.configure || false,
            content: []
        };

        this.onChangeContent = this.onChangeContent.bind(this);
    }

    componentWillMount () {
        const { password } = this.state;
        const content = [];
        if (password) content.push(
            <PasswordManagement
                key="password"
                onChangeContent={this.onChangeContent}
            />
        );

        this.setState({
            content: [
                ...this.state.content,
                ...content
            ]
        });
    }

    onChangeContent (content) {
        this.props.onUpdateContent(content);
    }

    render () {
        const { content } = this.state;
        const popupButton = <Icon fitted link name="configure"/>;
        return (
            <Popup
                basic
                position="bottom right"
                on="click"
                trigger={popupButton}
                >
                <Popup.Header>Management account</Popup.Header>
                <Popup.Content>
                    <div className="Account-management">
                        <ul>{content}</ul>
                        <Button.Group fluid>
                            <Button primary content="Friends" />
                            <Button secondary content="Account" />
                            <Button
                                className="changes-pic"
                                animated={true}
                                >
                                <Button.Content visible>
                                    <Icon size="large" name="picture" />
                                </Button.Content>
                                <Button.Content hidden>
                                    <Image
                                        avatar
                                        src={window.INITIAL_STATE.user.image}
                                    />
                                </Button.Content>
                            </Button>
                        </Button.Group>
                    </div>
                </Popup.Content>
            </Popup>
        );
    }
}

export default ManagementAccount
