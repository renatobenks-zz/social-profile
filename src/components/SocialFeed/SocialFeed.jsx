import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

import BreadcrumbRoute from '../BreadcrumbRoute/BreadcrumbRoute.jsx'
class SocialFeed extends Component {
    constructor (props) {
        super(props);
        this.scrollTop = this.scrollTop.bind(this);
        this.onClickScroll = this.onClickScroll.bind(this);
    }

    scrollTop ({top}) {
        let scroll = 0;
        const offsetTop = Math.abs(document.body.getBoundingClientRect().top-top);
        const scrollingTimer = setInterval(() => {
            scroll += 13;
            window.scrollTo(0, scroll);
            if (scroll >= offsetTop) clearInterval(scrollingTimer);
        }, 13);
    }

    onClickScroll (event) {
        event.preventDefault();
        const content = event.currentTarget.parentNode.parentNode;
        this.scrollTop(content.getBoundingClientRect());
    }

    render () {
        const { children } = this.props;
        return (
            <div className="App-social">
                <BreadcrumbRoute default />
                <h1><Icon name="browser" /> Status | timeline</h1>
                <hr/>
                {children}
                <p>
                    No more content, <strong>sign to the top</strong>
                    <Button
                        basic
                        inverted
                        animated="vertical"
                        onClick={this.onClickScroll}
                        >
                        <Button.Content visible>
                            <Icon color="grey" name="angle up" />
                        </Button.Content>
                        <Button.Content hidden>
                            <Icon color="grey" name="double angle up" />
                        </Button.Content>
                    </Button>
                </p>
            </div>
        );
    }
}

export default SocialFeed
