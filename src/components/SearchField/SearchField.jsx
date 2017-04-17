import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'

class SearchField extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: props.label,
            content: [],
            loading: props.loading || false,
            icon: props.icon || '',
            showNoResults: props.showNoResults || false,
            noResults: props.showNoResults ? props.noResults  : {},
            firstResult: props.firstResult || false
        };

        this.onSearch = this.onSearch.bind(this);
    }

    componentWillMount () {
        const { props } = this;
        let content = [];
        if (props.content.status)
            props.content.status.map(item => {
                content.push({
                    title: item.text,
                    description: item.user
                });
            });

        if (props.content.friends)
            props.content.friends.map(item => {
                content.push({
                    title: item.user,
                    image: item.image
                });
            });

        this.setState({
            content
        });
    }

    onSearch (event, value) {
        this.setState({
            value
        });

        this.props.onSearch(value);
    }

    render () {
        return (
            <Search
                onSearchChange={this.onSearch}
                showNoResults={this.state.showNoResults}
                selectFirstResult={this.state.firstResult}
                loading={this.state.loading}
                icon={this.state.icon}
                input="text"
                value={this.state.value}
                results={this.state.content}
            />
        )
    }
}

export default SearchField
