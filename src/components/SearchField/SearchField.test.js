import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockStatus, mockFriends, eventMock } from '../components.mock'
import SearchField from './SearchField.jsx'

const mockSearch = {
    onSearch: (value, results, props) => ({value, results, props})
};

const propsField = {
    label: "First value like label",
    content: {status: mockStatus},
    firstResult: true,
    icon: "search",
    onSearch: (value, results, props) => mockSearch.onSearch(value, results, props)
};

const createComponent = (props) =>
    ReactRender.create(
        <SearchField {...props} />
    );
const SearchFieldComponent = createComponent(propsField);
let component = SearchFieldComponent.toJSON();

describe('Component: SearchField', () => {
    let search = component.children[0];
    let input = search.children[0];
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    describe('Search', () => {
        test('get search input with icon', () => {
            expect(search.children.length).toBe(2);
        });

        describe('Icon', () => {
            let icon = search.children[1];
            test('get the renders icon', () => {
                expect(icon.type).toBe('i');
            });

            test('get the renders search with icon', () => {
                expect(search.props.className.split(' ')).toEqual(
                    expect.arrayContaining(
                        ['icon', 'input']
                    )
                );
            });

            describe('with icon', () => {
                test('get the renders search icon when icon enabled', () => {
                    expect(icon.props.className.split(' ')).toEqual(
                        expect.arrayContaining(
                            ['search']
                        )
                    );
                });
            });

            describe('with no icon', () => {
                delete propsField.icon;
                let component = createComponent(propsField).toJSON();
                let search = component.children[0];
                let icon = search.children[1];

                test('renders search with no icon', () => {
                    expect(component).toMatchSnapshot();
                });

                test('no renders search icon when icon is disabled', () => {
                    expect(icon.props.className.split(' ')).not.toEqual(
                        expect.arrayContaining(
                            ['search']
                        )
                    );
                });
            });
        });

        describe('Input', () => {
            test('get the renders input', () => {
                expect(input.type).toBe('input');
            });

            test('entry input should be text', () => {
                expect(input.props.type).toBe('text');
            });

            test('get my label message to renders', () => {
                expect(input.props.value).toBe(
                    propsField.label
                );
            });
        });
    });

    describe('onFocus', () => {
        test('renders in search the empty value when search its focus', () => {
            input.props.onFocus(eventMock);
            let component = SearchFieldComponent.toJSON();
            expect(component).toMatchSnapshot();
        });

        test('stop propagation in search focus', () => {
            spyOn(eventMock, 'stopPropagation');
            input.props.onFocus(eventMock);
            expect(eventMock.stopPropagation).toHaveBeenCalled();
        });

        test('get the search value renders when search its focus with label value', () => {
            expect(input.props.value).toBe(propsField.label);
            input.props.onFocus(eventMock);
            let component = SearchFieldComponent.toJSON();
            let search = component.children[0];
            input = search.children[0];
            expect(input.props.value).toBe('');
        });
    });

    describe('onBlur', () => {
        test('renders in search the label value when search its blur', () => {
            input.props.onBlur(eventMock);
            let component = SearchFieldComponent.toJSON();
            expect(component).toMatchSnapshot();
        });

        test('stop propagation in search focus', () => {
            spyOn(eventMock, 'stopPropagation');
            input.props.onBlur(eventMock);
            expect(eventMock.stopPropagation).toHaveBeenCalled();
        });

        test('get the search value renders when search its blur with empty value', () => {
            expect(input.props.value).toBe('');
            input.props.onBlur(eventMock);
            let component = SearchFieldComponent.toJSON();
            let search = component.children[0];
            input = search.children[0];
            expect(input.props.value).toBe(propsField.label);
        });
    });

    describe('componentDidUpdate', () => {
        beforeEach(() => {
            spyOn(mockSearch, 'onSearch');
        });

        describe('onFocus', () => {
            test('updates the search when focus changes', () => {
                input.props.onFocus(eventMock);
                expect(mockSearch.onSearch).toHaveBeenCalledWith(
                    '',
                    mockStatus.map(status => ({
                        title: status.text,
                        description: status.user
                    })),
                    {focused: true}
                );
            });

            test('updates the search when focus not changes', () => {
                input.props.onFocus(eventMock);
                expect(mockSearch.onSearch).not.toHaveBeenCalled();
            });
        });

        describe('onBlur', () => {
            test('updates the search when focus changes', () => {
                input.props.onBlur(eventMock);
                expect(mockSearch.onSearch).toHaveBeenCalledWith(
                    propsField.label,
                    mockStatus.map(status => ({
                        title: status.text,
                        description: status.user
                    })),
                    {focused: false}
                );
            });

            test('updates the search when focus not changes', () => {
                input.props.onBlur(eventMock);
                expect(mockSearch.onSearch).not.toHaveBeenCalled();
            });
        });
    });

    describe('onSearch', () => {
        eventMock.target.value = 'nothing';
        beforeEach(() => {
            input.props.onChange(eventMock);
        });

        test('renders the updates value in search', () => {
            expect(SearchFieldComponent.toJSON()).toMatchSnapshot();
        });

        test('update search value', () => {
            let component = SearchFieldComponent.toJSON();
            let search = component.children[0];
            const input = search.children[0];
            expect(input.props.value).toBe('nothing');
        });

        test('update content results matched with search value in the search', () => {
            let component = SearchFieldComponent.toJSON();
            const results = component.children[1];
            expect(results.children.length).toBe(1);
            const result = results.children[0];
            const content = {
                title: result.children[0].children[0],
                description: result.children[0].children[1]
            };

            expect(content.title.children[0]).toBe(mockStatus[0].text);
            expect(content.description.children[0]).toBe(mockStatus[0].user);
        });

        test('callback for search when search values changes', () => {
            spyOn(mockSearch, 'onSearch');
            eventMock.target.value = propsField.label;
            input.props.onFocus(eventMock);
            eventMock.target.value = 'nothing';
            input.props.onChange(eventMock);
            const status = mockStatus[0];
            expect(mockSearch.onSearch).toHaveBeenCalledWith(
                'nothing',
                [{title: status.text, description: status.user}],
                {focused: true}
            );
        });

        test('get the renders empty search value when value is a special string', () => {
            const special_string = '~`!#$%&*+=;,/{}|":<>'.split('');
            for (let string of special_string) {
                eventMock.target.value = string;
                input.props.onChange(eventMock);
                let component = SearchFieldComponent.toJSON();
                let search = component.children[0];
                input = search.children[0];
                expect(input.props.value).toBe('');
            }
        });
    });

    describe('Results', () => {
        const results = component.children[1];
        test('get the renders results', () => {
            expect(results.type).toBe('div');
            expect(results.props.className.split(' ')).toEqual(
                expect.arrayContaining([
                    'results'
                ])
            );
        });

        describe('First result', () => {
            test('first content results should be active', () => {
                expect(results.children[0].props.className.split(' ')).toEqual(
                    expect.arrayContaining(
                        ['active']
                    )
                );
            });

            test('first content results should be not active', () => {
                delete propsField.firstResult;
                let component = createComponent(propsField).toJSON();
                const results = component.children[1];
                expect(results.children[0].props.className.split(' '))
                    .not.toEqual(
                    expect.arrayContaining(
                        ['active']
                    )
                );
            });
        });

        describe('Content: status', () => {
            test('get the renders status content to match search', () => {
                expect(results.children.length).toBe(mockStatus.length);
            });

            test('get the renders title of status results', () => {
                for (let result of results.children) {
                    const contentResults = mockStatus[
                        results.children.indexOf(result)
                    ];
                    const content = result.children[0];
                    const title = content.children[0];
                    expect(title.children[0]).toBe(contentResults.text);
                }
            });

            test('get the renders description of status results', () => {
                for (let result of results.children) {
                    const contentResults = mockStatus[
                        results.children.indexOf(result)
                    ];
                    const content = result.children[0];
                    const description = content.children[1];
                    expect(description.children[0]).toBe(contentResults.user);
                }
            });
        });

        describe('Content: friends', () => {
            propsField.content.friends = mockFriends;
            delete propsField.content.status;
            let component = createComponent(propsField).toJSON();
            const results = component.children[1];

            test('get the renders friends content to match search', () => {
                expect(results.children.length).toBe(mockFriends.length);
            });

            test('get the renders title of friends results', () => {
                for (let result of results.children) {
                    const contentResults = mockFriends[
                        results.children.indexOf(result)
                    ];
                    const content = result.children[1];
                    const title = content.children[0];
                    expect(title.children[0]).toBe(contentResults.user);
                }
            });

            test('get the renders image of friends content', () => {
                for (let result of results.children) {
                    const contentResults = mockFriends[
                        results.children.indexOf(result)
                    ];
                    const image = result.children[0];
                    const img = image.children[0];
                    expect(img.props.src).toBe(contentResults.image);
                }
            });
        });

        describe('Content: status & friends', () => {
            propsField.content.status = mockStatus;
            let component = createComponent(propsField).toJSON();
            const results = component.children[1];

            let contentResults;
            beforeEach(() => {
                contentResults = [];
                mockStatus.map(status => contentResults.push(status));
                mockFriends.map(friend => contentResults.push(friend));
            });

            test('get the renders the status & friends content to match search', () => {
                expect(results.children.length).toBe(contentResults.length);
            });

            test('get the renders title of status and friends results', () => {
                for (let result of results.children) {
                    let resultsContent = (contentResults[
                        results.children.indexOf(result)
                    ]);

                    let content = result.children[
                        result.children[1] ? 1 : 0
                    ];
                    let title = content.children[0];
                    if (result.children[1]) {
                        expect(title.children[0])
                            .toBe(resultsContent.user);
                    } else {
                        expect(title.children[0])
                            .toBe(resultsContent.text);
                    }
                }
            });

            test('get the renders content of status and friends results', () => {
                for (let result of results.children) {
                    let resultsContent = contentResults[
                        results.children.indexOf(result)
                    ];

                    let content = result.children[0];
                    content = content.children[
                        result.children[1] ? 0 : 1
                    ];

                    if (result.children[1]) {
                        expect(content.props.src)
                            .toBe(resultsContent.image);
                    } else {
                        expect(content.children[0])
                            .toBe(resultsContent.user);
                    }
                }
            });
        });
    });
});
