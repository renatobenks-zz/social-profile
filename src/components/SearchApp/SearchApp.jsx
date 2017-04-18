import React, { Component } from 'react'

import SearchField from '../SearchField/SearchField.jsx'
class SearchApp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            content: {
                status: props.status || [],
                friends: props.friends || []
            }
        };
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
                    onSearch={this.onSearchApp}
                    content={this.state.content}
                    firstResult={true}
                    showNoResults={true}
                    noResults={noResults}
                />
            </div>
        )
    }
}

export default SearchApp
