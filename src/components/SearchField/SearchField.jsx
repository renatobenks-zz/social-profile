import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'

class SearchField extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: props.label,
            content: [],
            results: [],
            loading: props.loading || false,
            icon: props.icon || 'info',
            showNoResults: props.showNoResults || false,
            noResults: props.showNoResults ? props.noResults  : {},
            firstResult: props.firstResult || false,
            fluid: props.fluid || false
        };

        this.onSearch = this.onSearch.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentWillMount () {
        const { props } = this;
        let content = [];
        if (props.content.status)
            if (props.content.status.length > 0)
                props.content.status.map(item => {
                    content.push({
                        title: item.text,
                        description: item.user
                    });
                });

        if (props.content.friends)
            if (props.content.friends.length > 0)
                props.content.friends.map(item => {
                    content.push({
                        title: item.user,
                        image: item.image
                    });
                });

        this.setState({
            content,
            results: content
        });
    }

    onSearch (event, value) {
        let results = this.state.content
            .filter(item => item.title.toLowerCase()
                .search(value.toLowerCase()) !== -1
            );
        this.setState({
            value,
            results
        });

        this.props.onSearch(value, results);
    }

    onBlur (event) {
        event.stopPropagation();
        if (!this.state.value) {
            this.setState({
                value: this.props.label
            });
        }
    }

    onFocus (event) {
        event.stopPropagation();
        if (this.state.value === this.props.label) {
            this.setState({
                value: ''
            });
        }
    }

    render () {
        return (
            <Search
                onSearchChange={this.onSearch}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                showNoResults={this.state.showNoResults}
                {...this.state.noResults}
                selectFirstResult={this.state.firstResult}
                loading={this.state.loading}
                icon={this.state.icon}
                input="text"
                value={this.state.value}
                results={this.state.results}
                fluid={this.state.fluid}
            />
        )
    }
}

export default SearchField
