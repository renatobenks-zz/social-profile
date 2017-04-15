import React from 'react';
import ReactRender from 'react-test-renderer';

const mockStatus = [
    { user: 'Elton', text: 'nothing interesting' },
    { user: 'Elton', text: 'status updated' },
    { user: 'Elton', text: 'my status' },
    { user: 'Vinicius', text: 'other status' }
];

const propsApp = {
    banner: "banner.png",
    logo: "logo.svg",
    title: "My title app",
    status: mockStatus
};

import App from './App.jsx';
const component = ReactRender.create(
    <App
        {...propsApp}
    />
);

describe('Component: App', () => {
    test('renders without crashing', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });
});
