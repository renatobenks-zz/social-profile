import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import logo from '../public/images/logo.svg';
import App from './App';

const render = (Container) => {
    ReactDOM.render(
        <AppContainer>
            <Container logo={logo} {...window.INITIAL_STATE} />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./App.js', () => {
        const App = require('./App.js').default;
        render(App);
    });
}
