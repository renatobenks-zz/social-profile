import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import logo from '../public/images/logo.svg';
import App from './components/App.jsx';

const status = [
    { user: 'Elton', text: 'nothing interesting' },
    { user: 'Elton', text: 'status updated' },
    { user: 'Elton', text: 'my status' },
    { user: 'Vinicius', text: 'other status' }
];

const friends = [
    { id: 1, user: 'Elton', image: '/public/01.avatar.jpg' },
    { id: 2, user: 'Vinicius', image: '/public/02.avatar.png' }
];

import banner from '../public/images/banner.png';
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
