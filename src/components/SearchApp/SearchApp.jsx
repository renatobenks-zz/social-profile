import React, { Component } from 'react'

import SearchField from '../SearchField/SearchField.jsx'
class SearchApp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            loading: false,
            content: {
                status: props.status || [],
                friends: props.friends || []
            }
        };

        this.onSearchInApp = this.onSearchInApp.bind(this);
    }

    onSearchInApp (value, results, {focused}) {
        this.setState({loading: true});
        if (!focused)
            return this.setState({
                open: false, loading: false
            });

        setTimeout(() => {
            this.setState({loading: false, open: true});
        }, 600);
    }

    render () {
        const noResults= {
            noResultsMessage: 'Nothing was found',
            noResultsDescription: 'Please, see our suggestions for you.'
        };

        return (
            <div className="App-search">
                <SearchField
                    label="What you searching for here?"
                    icon="search"
                    fluid={true}
                    onSearch={this.onSearchInApp}
                    open={this.state.open}
                    loading={this.state.loading}
                    content={this.state.content}
                    firstResult={true}
                    showNoResults={true}
                    noResults={noResults}
                    maxResults={3}
                />
            </div>
        )
    }
}

export default SearchApp
