import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import logo from '../public/images/logo.svg'
import App from './components/App.jsx'

const user = {
    id: 1,
    logged: true,
    name: 'Renato Benkendorf',
    user: 'renatão',
    image: '/public/images/02.avatar.jpg',
    feed: {
        status: [
            { id: 1, user: 'Elton', text: 'nothing interesting' },
            { id: 2, user: 'Elton', text: 'status updated' },
            { id: 3, user: 'Vinicius', text: 'my status' },
            { id: 4, user: 'Vinicius', text: 'my other status' },
            { id: 5, user: 'Vinicius', text: 'other status' },
            { id: 6, user: 'Elton', text: 'nothing interesting' },
            { id: 7, user: 'Elton', text: 'status updated' },
            { id: 8, user: 'Vinicius', text: 'my status' },
            { id: 9, user: 'Vinicius', text: 'my other status' },
            { id: 10, user: 'Elton', text: 'nothing interesting' },
            { id: 11, user: 'Elton', text: 'status updated' },
            { id: 12, user: 'Vinicius', text: 'my status' },
            { id: 13, user: 'Vinicius', text: 'my other status' }
        ]
    },
    friends: [
        {
            id: 2,
            user: 'Elton',
            image: '/public/images/01.avatar.jpg',
            favorite: true
        },
        {
            id: 3,
            user: 'Vinicius',
            image: '/public/images/01.avatar.jpg',
            favorite: true
        },
        {
            id: 4,
            user: 'Cozinheira',
            image: '/public/images/01.avatar.jpg',
            favorite: true
        },
        {
            id: 5,
            user: '',
            image: '/public/images/01.avatar.jpg',
            favorite: true
        },
        {
            id: 6,
            user: '',
            image: '/public/images/01.avatar.jpg',
            favorite: false
        }
    ],
};

import banner from '../public/images/banner.png'
const render = (Container) => {
    ReactDOM.render(
        <AppContainer>
            <Container
                banner={banner}
                logo={logo}
                user={user}
                status={user.feed.status}
                friends={user.friends}
                {...window.INITIAL_STATE}
            />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/App.jsx', () => {
        const App = require('./components/App.jsx').default;
        render(App);
    });
}
