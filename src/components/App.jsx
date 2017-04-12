import React, { Component } from 'react';

import Banner from './Banner/Banner.jsx';
import Header from './Header/Header.jsx';
import Company from './Company/Company.jsx';
import Title from './Title/Title.jsx';
import Content from './Content/Content.jsx';
class App extends Component {
    render () {
        const { title, logo, banner } = this.props;
        return (
            <div className='App'>
                <Banner banner={banner}/>
                <Header>
                    <Company logo={logo}>
                        <Title title={title} />
                    </Company>
                </Header>
                <Content>
                    <p>
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                </Content>
            </div>
        );
    }
}

export default App
