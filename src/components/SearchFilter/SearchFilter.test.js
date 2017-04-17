import React from 'react'
import ReactRender from 'react-test-renderer'

import { eventMock } from '../components.mock';

const mockContent = [
    { user: 'Elton', text: 'nothing interesting' },
    { user: 'Elton', text: 'status updated' },
    { user: 'Elton', text: 'my status' },
    { user: 'Vinicius', text: 'other status' }
];

const App = {
    filtersDisabled: (filterDisabled) => ({filterDisabled})
};

const propsSearchFilterComponent = {
    label: "Searching for",
    content: mockContent,
    checkFilterDisabled: (filterDisabled) =>
        App.filtersDisabled(filterDisabled)
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

    describe('onSearchFilter', () => {
        const search = component.children[0];
        let input = search.children[0];
        test('renders input search filter with value updated', () => {
            input.props.onChange(eventMock);
            const component = SearchFilterComponent.toJSON();
            const search = component.children[0];
            input = search.children[0];
            expect(input.props.value).toBe('my new value');
        });

        test('check filter is not disabled when search filter its valid', () => {
            spyOn(App, 'filtersDisabled');
            input.props.onChange(eventMock);
            expect(App.filtersDisabled).toHaveBeenCalledWith(false);
        });

        test('check filter is disabled when search filter its invalid', () => {
            spyOn(App, 'filtersDisabled');
            eventMock.target.value = '';
            input.props.onChange(eventMock);
            expect(App.filtersDisabled).toHaveBeenCalledWith(true);
            eventMock.target.value = 'Searching for';
            input.props.onChange(eventMock);
            expect(App.filtersDisabled).toHaveBeenCalledWith(true);
        });
    });

    describe('Search', () => {
        const search = component.children[0];
        test('renders search', () => {
            expect(search.type).toBe('div');
            expect(search.props.className.split(' ')).toEqual(
                expect.arrayContaining(
                    ['icon', 'input']
                )
            );
        });

        test('renders input with icon', () => {
            expect(search.children.length).toBe(2);
        });

        describe('onSearchFilter', () => {

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

        describe('Icon', () => {
            const icon = search.children[1];
            test('renders icon', () => {
                expect(icon.type).toBe('i');
            });

            test('renders search icon', () => {
                expect(icon.props.className.split(' ')).toEqual(
                    expect.arrayContaining(
                        ['search']
                    )
                );
            });
        });
    });

    describe('Results', () => {
        const results = component.children[1];
        test('renders results', () => {
            expect(results.type).toBe('div');
            expect(results.props.className.split(' ')).toEqual(
                expect.arrayContaining([
                    'results'
                ])
            );
        });

        test('renders the content got in props content', () => {
            expect(results.children.length).toBe(mockContent.length);
        });

        test('first content results should be active', () => {
            expect(results.children[0].props.className.split(' ')).toEqual(
                expect.arrayContaining(
                    ['active']
                )
            );
        });

        describe('Title', () => {
            test('renders title on content results', () => {
                for (let result of results.children) {
                    const contentResults = mockContent[results.children.indexOf(result)];
                    const content = result.children[0];
                    const title = content.children[0];
                    expect(title.props.className).toBe('title');
                    expect(title.children[0]).toBe(contentResults.text);
                }
            });
        });

        describe('Description', () => {
            test('renders description on content results', () => {
                for (let result of results.children) {
                    const contentResults = mockContent[results.children.indexOf(result)];
                    const content = result.children[0];
                    const description = content.children[1];
                    expect(description.props.className).toBe('description');
                    expect(description.children[0]).toBe(contentResults.user);
                }
            });
        });
    });
});
