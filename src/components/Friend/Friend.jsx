import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import FriendContent from './FriendContent.jsx'
import FriendExtra from './FriendExtra.jsx'

class Friend extends Component {
    static Content = FriendContent;
    static Extra = FriendExtra;

    static cleanProps (props) {
        delete props.messenger;
        return props;
    }

    render () {
        const { messenger, children } = this.props;
        const props = Friend.cleanProps({...this.props});
        props.fluid = !!messenger;
        props.link = !!messenger;

        return (
            <Card {...props}>
                {children}
            </Card>
        );
    }
}

export default Friend
