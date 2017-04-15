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
