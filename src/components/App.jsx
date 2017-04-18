import React, { Component } from 'react';

import Banner from './Banner/Banner.jsx';
import Header from './Header/Header.jsx';
import Company from './Company/Company.jsx';
import Title from './Title/Title.jsx';
import Content from './Content/Content.jsx';
import Filters from './Filters/Filters.jsx';
import SearchFilter from './SearchFilter/SearchFilter.jsx'
import SearchApp from './SearchApp/SearchApp.jsx'

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            filtersDisabled: true
        };

        this.filtersDisabled = this.filtersDisabled.bind(this);
    }

    filtersDisabled (filtersDisabled) {
        this.setState({
            filtersDisabled
        });
    }

    render () {
        const { title, logo, banner, status, friends } = this.props;
        return (
            <div className="App">
                <Banner banner={banner}/>
                <SearchApp status={status} friends={friends} />
                <Header>
                    <Company logo={logo}>
                        <Title title={title} />
                    </Company>
                    <Filters
                        disabled={this.state.filtersDisabled}
                        label="You can filter your list of status here"
                        >
                        <SearchFilter
                            checkFilterDisabled={this.filtersDisabled}
                            label="What you searching for?"
                            content={status}
                        />
                    </Filters>
                </Header>
                <Content>

                </Content>
            </div>
        );
    }
}

export default App
