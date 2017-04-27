import React, { Component } from 'react'
import { Button, Icon, Image } from 'semantic-ui-react'

class Management extends Component {
    render () {
        const { children } = this.props;
        return (
            <div className="Account-management">
                {children}
                <Button.Group>
                    <Button primary content="Friends" />
                    <Button secondary content="Account" />
                    <Button className="changes-pic" animated={true}>
                        <Button.Content visible>
                            <Icon size="large" name="picture" />
                        </Button.Content>
                        <Button.Content hidden>
                            <Image avatar src={window.INITIAL_STATE.user.image} />
                        </Button.Content>
                    </Button>
                </Button.Group>
            </div>
        );
    }
}

export default Management
