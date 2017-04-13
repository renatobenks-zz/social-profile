import React, { Component } from 'react';

import Banner from './Banner/Banner.jsx';
import Header from './Header/Header.jsx';
import Company from './Company/Company.jsx';
import Title from './Title/Title.jsx';
import Content from './Content/Content.jsx';
import Filters from './Filters/Filters.jsx';
import SearchFilter from './SearchFilter/SearchFilter.jsx'
class App extends Component {
    render () {
        const { title, logo, banner, status } = this.props;
        return (
            <div className="App">
                <Banner banner={banner}/>
                <Header>
                    <Company logo={logo}>
                        <Title title={title} />
                    </Company>
                    <Filters label="You can filter your list of status here">
                        <SearchFilter
                            label="What you searching for?"
                            status={status}
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
