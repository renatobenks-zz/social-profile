import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

class SearchFilter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            content: []
        }
    }

    componentWillMount () {
        this.setState({
            content: this.props.content.map(item => ({
                title: item.text,
                description: item.user
            }))
        });
    }

    render () {
        return (
            <Search
                showNoResults={false}
                selectFirstResult={true}
                loading={false}
                icon="search"
                input="text"
                defaultValue={this.props.label}
                results={this.state.content}
            />
        )
    }
}

export default SearchFilter
