import React from 'react'
import ReactRender from 'react-test-renderer'

const mockContent = [
    { user: 'Elton', text: 'nothing interesting' },
    { user: 'Elton', text: 'status updated' },
    { user: 'Elton', text: 'my status' },
    { user: 'Vinicius', text: 'other status' }
];

const propsSearchFilterComponent = {
    label: "My label message to search with filter",
    content: mockContent
};

import SearchFilter from './SearchFilter.jsx'
const SearchFilterComponent = ReactRender.create(
    <SearchFilter
        {...propsSearchFilterComponent}
    />
);

const component = SearchFilterComponent.toJSON();

describe('Component: SearchFilter', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    describe('Search', () => {
        const search = component.children[0];
        test('renders search', () => {
            const classForSearch = search.props.className.split(' ');
            expect(search.type).toBe('div');
            expect(classForSearch).toEqual(expect.arrayContaining(
                ['icon', 'input']
            ));
        });

        test('renders input with icon', () => {
            expect(search.children.length).toBe(2);
        });

        describe('Input', () => {
            const input = search.children[0];
            test('renders input', () => {
                expect(input.type).toBe('input');
            });

            test('entry input should be text', () => {
                expect(input.props.type).toBe('text');
            });

            test('get my label message to renders', () => {
                expect(input.props.value).toBe(
                    propsSearchFilterComponent.label
                );
            });
        });
    });
});
