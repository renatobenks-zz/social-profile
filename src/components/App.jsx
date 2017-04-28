import React, { Component } from 'react'

import Banner from './Banner/Banner.jsx'

import Header from './Header/Header.jsx'
import Company from './Company/Company.jsx'
import Title from './Title/Title.jsx'

import Content from './Content/Content.jsx'
import Filters from './Filters/Filters.jsx'

import SearchFilter from './SearchFilter/SearchFilter.jsx'
import SearchApp from './SearchApp/SearchApp.jsx'

import Account from './Account/Account.jsx'
import FriendsList from './FriendsList/FriendsList.jsx'
import SocialFeed from './SocialFeed/SocialFeed.jsx'
import StatusList from './StatusList/StatusList.jsx'
import Messenger from './Messenger/Messenger.jsx'

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: props.user,
            filtersDisabled: true
        };

        this.disableFilters = this.disableFilters.bind(this);
    }

    disableFilters (filtersDisabled) {
        this.setState({
            filtersDisabled
        });
    }

    render () {
        const { title, subtitle, logo, banner } = this.props;
        const { user, filtersDisabled } = this.state;
        const { friends, feed } = user;
        const { status } = feed;
        const content = {status, friends};
        return (
            <div className="App">
                <Banner banner={banner} />
                <SearchApp status={status} friends={friends} />
                <Header>
                    <Company logo={logo}>
                        <Title title={title} subtitle={subtitle} />
                    </Company>
                    <Filters
                        disabled={filtersDisabled}
                        label="You can filter your list of status here"
                        >
                        <SearchFilter
                            checkFilterDisabled={this.disableFilters}
                            label="What you searching for?"
                            content={status}
                        />
                    </Filters>
                </Header>
                <Content>
                    <Content.Row>
                        <Content.Column width="4">
                            <div className="App-content-left">
                                <Account user={user} />
                                <FriendsList friends={friends} />
                            </div>
                        </Content.Column>
                        <Content.Column width="8">
                            <SocialFeed>
                                <StatusList content={content}/>
                            </SocialFeed>
                        </Content.Column>
                        <Content.Column width="4">
                            <Messenger friends={friends} />
                        </Content.Column>
                    </Content.Row>
                </Content>
            </div>
        );
    }
}

export default App
