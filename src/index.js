import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import logo from '../public/images/logo.svg'
import banner from '../public/images/banner.png'
import App from './components/App.jsx'

const user = {
    id: 1,
    logged: true,
    name: 'Renato Benkendorf',
    user: 'renatão',
    image: '/public/images/02.avatar.png',
    feed: {
        status: [
            { id: 1, user: 'Elton', text: 'nothing interesting' },
            { id: 2, user: 'Elton', text: 'status updated' },
            { id: 3, user: 'Vinicius Dacal', text: 'my status' },
            { id: 4, user: 'Vinicius Dacal', text: 'my other status' },
            { id: 5, user: 'Vinicius Dacal', text: 'other status' },
            { id: 6, user: 'Elton', text: 'nothing interesting' },
            { id: 7, user: 'Elton', text: 'status updated' },
            { id: 8, user: 'Vinicius Dacal', text: 'my status' },
            { id: 9, user: 'Vinicius Dacal', text: 'my other status' },
            { id: 10, user: 'Elton', text: 'nothing interesting' },
            { id: 11, user: 'Elton', text: 'status updated' },
            { id: 12, user: 'Vinicius Dacal', text: 'my status' },
            { id: 13, user: 'Vinicius Dacal', text: 'my other status' },
            { id: 14, user: '', text: 'my other status' }
        ]
    }
};

window.INITIAL_STATE = {...window.INITIAL_STATE, user};
const render = (Container) => {
    ReactDOM.render(
        <AppContainer>
            <Container
                banner={banner}
                logo={logo}
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
