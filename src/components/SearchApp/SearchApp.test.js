import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockStatus, mockFriends } from '../components.mock'
import SearchApp from './SearchApp.jsx'

const propsSearchApp = {
    status: mockStatus,
    friends: mockFriends
};

const createComponent = (props={}) =>
    ReactRender.create(
        <SearchApp {...props} />
    );

const component = createComponent(propsSearchApp).toJSON();

describe('Component: SearchApp', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    describe('No content', () => {
        const component = createComponent().toJSON();
        test('renders component without content', () => {
            expect(component).toMatchSnapshot();
        });
    });
});
