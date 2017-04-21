import React, { Component } from 'react';

class Title extends Component {
    render () {
        const { title, subtitle, children } = this.props;
        const content = [];
        if (title)
            content.push(
                <h1 key="title">
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

        return (
            <div className="App-title">
                {content}
                {children}
            </div>
        );
    }
}

export default Title
