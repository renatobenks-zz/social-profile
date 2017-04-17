import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

class SearchFilter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            content: [],
            value: props.label
        };

        this.onSearchFilter = this.onSearchFilter.bind(this);
    }

    componentWillMount () {
        this.setState({
            content: this.props.content.map(item => ({
                title: item.text,
                description: item.user
            }))
        });
    }

    onSearchFilter (event, value) {
        this.setState({
            value
        });

        if (!value || value === this.props.label)
            this.props.checkFilterDisabled(true);
        else {
            this.props.checkFilterDisabled(false);
        }
    }

    render () {
        return (
            <Search
                onSearchChange={this.onSearchFilter}
                showNoResults={false}
                selectFirstResult={true}
                loading={false}
                icon="search"
                input="text"
                value={this.state.value}
                results={this.state.content}
            />
        )
    }
}

export default SearchFilter
