import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'

class SearchField extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: props.label,
            content: [],
            results: [],
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
                        key: item.id,
                        title: item.text,
                        description: item.user
                    });
                });

        if (props.content.friends)
            if (props.content.friends.length > 0)
                props.content.friends.map(item => {
                    content.push({
                        key: `${item.user}-${item.id}`,
                        title: item.user,
                        image: item.image
                    });
                });

        this.setState({
            content,
            results: content
        });
    }

    componentDidUpdate (props, prevState) {
        if (this.state.focused !== prevState.focused)
            props.onSearch(this.state.value, this.state.results, {
                focused: this.state.focused
            });
    }

    onSearch (event, value) {
        // special characters
        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value))
            return this.setState({value: ''});
        const results = this.state.content
            .filter(item => item.title.toLowerCase()
                .search(value.toLowerCase()) !== -1
            );

        this.setState({
            value,
            results
        });

        this.props.onSearch(value, results, {
            focused: this.state.focused
        });
    }

    onBlur (event) {
        event.stopPropagation();
        this.setState(() => {
            const newState = {focused: false};
            if (!this.state.value)
                newState.value = this.props.label;
            return newState;
        });
    }

    onFocus (event) {
        event.stopPropagation();
        this.setState(() => {
            const newState = {focused: true};
            if (this.state.value === this.props.label)
                newState.value = '';
            return newState;
        });
    }

    render () {
        const { loading, open } = this.props;
        return (
            <Search
                onSearchChange={this.onSearch}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                showNoResults={this.state.showNoResults}
                {...this.state.noResults}
                selectFirstResult={this.state.firstResult}
                loading={!!loading}
                icon={this.state.icon}
                input="text"
                value={this.state.value}
                open={!!open}
                results={this.state.results}
                fluid={this.state.fluid}
            />
        )
    }
}

export default SearchField
