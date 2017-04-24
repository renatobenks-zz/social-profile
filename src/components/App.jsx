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
        const { title, subtitle, logo, banner, status, friends, user } = this.props;
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
                    <Content.Row>
                        <Content.Column width="4">
                            <div className="App-content-left">
                                <Account user={user}>
                                    <Account.Management>
                                        <ul>
                                            <li>
                                                <a href="#">Configurations</a>
                                            </li>
                                            <li>
                                                <a href="#">Change password</a>
                                            </li>
                                        </ul>
                                    </Account.Management>
                                </Account>
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
