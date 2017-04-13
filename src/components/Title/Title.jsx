import React, { Component } from 'react';

class Title extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: props.title
        };
    }

    componentWillMount () {
        const text = this.state.title.split('.');
        if (text.length === 2) {
            this.setState({
                title: text[0],
                subtitle: text[1]
            });
        }
    }

    render () {
        let title = [
            <h1 key="title">{this.state.title}</h1>
        ];

        if (this.state.subtitle)
            title.push(
                <h2 key="subtitle" className="App-subtitle">
                    {this.state.subtitle}
                </h2>
            );

        return (
            <div className="App-title">
                {title}
            </div>
        );
    }
}

export default Title
