import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockStatus, mockFriends, eventMock } from '../components.mock'
import SearchApp from './SearchApp.jsx'

const propsSearchApp = {
    status: mockStatus,
    friends: mockFriends
};

const createComponent = (props={}) =>
    ReactRender.create(
        <SearchApp {...props} />
    );

const SearchAppComponent = createComponent(propsSearchApp);
const component = SearchAppComponent.toJSON();

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

    describe('onSearchInApp', () => {
        let component = SearchAppComponent.toJSON();
        const SearchField = component.children[0];
        const search = SearchField.children[0];
        const input = search.children[0];

        beforeEach(() => {
            jest.useFakeTimers();
            input.props.onFocus(eventMock);
        });

        test('renders to search in app', () => {
            expect(SearchAppComponent.toJSON()).toMatchSnapshot();
        });

        test('search should be loading', () => {
            component = SearchAppComponent.toJSON();
            const field = component.children[0];
            expect(field.props.className.split(' ')).toEqual(
                expect.arrayContaining(['loading'])
            );
        });

        test('open results and stop loading after 600ms', () => {
            jest.runAllTimers();
            component = SearchAppComponent.toJSON();
            const field = component.children[0];
            expect(field.props.className.split(' ')).not.toEqual(
                expect.arrayContaining(['loading'])
            );
            expect(field.props.className.split(' ')).toEqual(
                expect.arrayContaining(['visible'])
            );
        });

        test('close search results and stop loading when blur in search', () => {
            const field = component.children[0];
            input.props.onBlur(eventMock);
            expect(field.props.className.split(' ')).not.toEqual(
                expect.arrayContaining(['visible', 'loading'])
            );
        });
    });
});
