import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import logo from '../public/images/logo.svg'
import App from './components/App.jsx'

const status = [
    { id: 1, user: 'Elton', text: 'nothing interesting' },
    { id: 2, user: 'Elton', text: 'status updated' },
    { id: 3, user: 'Vinicius', text: 'my status' },
    { id: 4, user: 'Vinicius', text: 'my other status' },
    { id: 5, user: 'Vinicius', text: 'other status' }
];

const friends = [
    { id: 1, user: 'Elton', image: '/public/images/01.avatar.jpg' },
    { id: 2, user: 'Vinicius', image: '/public/images/02.avatar.png' }
];

import banner from '../public/images/banner.png'
const render = (Container) => {
    ReactDOM.render(
        <AppContainer>
            <Container
                banner={banner}
                logo={logo}
                status={status}
                friends={friends}
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
