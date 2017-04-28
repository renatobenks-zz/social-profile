import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'

class Title extends Component {
    render () {
        const { title, subtitle, children, icon } = this.props;
        const content = [];
        if (title)
            content.push(
                <h1 key="title">
                    {icon ? <Icon key="icon" name={icon} /> : ''}
                    {title}
                </h1>
            );

        if (subtitle) {
            content.push(
                <h2 key="subtitle" className="subtitle">
                    {subtitle}
                </h2>
            );
        }

        content.splice(0, 0, children);
        return (
            <div className="App-title">
                {content}
            </div>
        );
    }
}

export default Title
