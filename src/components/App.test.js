import React from 'react';
import ReactRender from 'react-test-renderer';

import App from './App.jsx';

const component = ReactRender.create(
    <App logo="logo.svg" title="My title app"/>
);

test('renders without crashing', () => {
    expect(component.toJSON()).toMatchSnapshot();
});
