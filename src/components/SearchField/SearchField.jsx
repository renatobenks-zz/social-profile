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
            fluid: props.fluid || false,
            maxResults: props.maxResults || 5
        };

        this.onSearch = this.onSearch.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentWillMount () {
        const { status, friends } = this.props.content;
        let content = [];
        if (status && status.length > 0)
            content = [
                ...content,
                ...status.map(item => ({
                    key: item.id,
                    title: item.text,
                    description: item.user
                }))
            ];

        if (friends && friends.length > 0)
            content = [
                ...content,
                ...friends.map(item => ({
                    key: `${item.user}-${item.id}`,
                    title: item.user ? item.user : 'Desconhecido',
                    image: item.image
                }))
            ];

        this.setState({
            content,
            results: content.length < this.state.maxResults ?
                content : content.splice(0, this.state.maxResults)
        });
    }

    componentDidUpdate (props, prevState) {
        if (this.state.focused !== prevState.focused)
            props.onSearch(this.state.value, this.state.results, {
                focused: this.state.focused
            });
    }

    onSearch (event, value) {
        const { maxResults } = this.state;
        // special characters
        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value))
            return this.setState({value: ''});
        let results = this.state.content
            .filter(item =>
                item.title.toLowerCase()
                    .search(value.toLowerCase()) !== -1);

        if (results.length > maxResults) {
            results = results.splice(
                results.length >= maxResults*2
                    ? Math.floor(Math.random()*((results.length-1)+1)) : 0,
                maxResults);
        }

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
