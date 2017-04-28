import React, { Component } from 'react'
import SearchField from '../SearchField/SearchField.jsx'

class SearchFilter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            content: { status: props.content}
        };

        this.onSearchFilter = this.onSearchFilter.bind(this);
    }

    onSearchFilter (value) {
        if (!value || value === this.props.label) {
            return this.props.checkFilterDisabled(true);
        } this.props.checkFilterDisabled(false);
    }

    render () {
        return (
            <SearchField
                label={this.props.label}
                onSearch={this.onSearchFilter}
                selectFirstResult={false}
                content={this.state.content}
            />
        )
    }
}

export default SearchFilter
