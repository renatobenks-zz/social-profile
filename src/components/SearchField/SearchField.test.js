import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockStatus, mockFriends, eventMock } from '../__mocks__/components'
import SearchField from './SearchField.jsx'

const mockSearch = {
    onSearch: (value, results, props) => ({value, results, props})
};

const propsField = {
    label: 'First value like label',
    content: {status: mockStatus},
    firstResult: true,
    icon: 'search',
    onSearch: (value, results, props) => mockSearch.onSearch(value, results, props)
};

const createComponent = props => ReactRender.create(
    <SearchField {...props} />
);

const SearchFieldComponent = createComponent(propsField);
let component = SearchFieldComponent.toJSON();

describe('Component: SearchField', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    let search = component.children[0];
    describe('Search', () => {
        test('get the search render with input and icon', () => {
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

        let input = search.children[0];
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

    let input = search.children[0];

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
                const status = mockStatus.map(status => ({
                    key: status.id,
                    title: status.text,
                    description: status.user
                }));

                expect(mockSearch.onSearch).toHaveBeenCalledWith(
                    '',
                    status,
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
                const status = mockStatus.map(status => ({
                    key: status.id,
                    title: status.text,
                    description: status.user
                }));

                expect(mockSearch.onSearch).toHaveBeenCalledWith(
                    propsField.label,
                    status,
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
        test('renders the updates value in search', () => {
            input.props.onChange(eventMock);
            expect(SearchFieldComponent.toJSON()).toMatchSnapshot();
        });

        test('update search value', () => {
            input.props.onChange(eventMock);
            let component = SearchFieldComponent.toJSON();
            let search = component.children[0];
            expect(search.children[0].props.value).toBe('nothing');
        });

        test('update content results matched with search value in the search', () => {
            input.props.onChange(eventMock);
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
            input.props.onFocus(eventMock);
            spyOn(mockSearch, 'onSearch');
            eventMock.target.value = 'nothing';
            input.props.onChange(eventMock);
            const status = {... mockStatus[0]};
            expect(mockSearch.onSearch).toHaveBeenCalledWith(
                'nothing',
                [{title: status.text, description: status.user, key: status.id}],
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

    describe('maxResults', () => {
        let SearchFieldComponent;
        let component;
        let input;
        const event = {...eventMock, target: {value: 'status'}};
        const props = {...propsField};
        const { content } = props;

        beforeEach(() => {
            content.status = [...content.status, ...mockStatus];
            content.status = content.status.map((status, index) => ({
                ...status, id: index + 1
            }));
        });

        describe('onChange', () => {
            beforeEach(() => {
                SearchFieldComponent = createComponent(props);
                component = SearchFieldComponent.toJSON();
                input = component.children[0].children[0];
            });

            test('renders max five results in the search for default results search', () => {
                input.props.onChange(event);
                expect(SearchFieldComponent.toJSON()).toMatchSnapshot();
            });

            test('renders five results in the search for default results search', () => {
                event.target.value = 's';
                input.props.onChange(event);
                expect(SearchFieldComponent.toJSON()).toMatchSnapshot();
            });

            test('renders max results defined in the search for results search', () => {
                SearchFieldComponent = createComponent({
                    ...props,
                    maxResults: 7
                });

                component = SearchFieldComponent.toJSON();
                input = component.children[0].children[0];
                event.target.value = 'status';
                input.props.onChange(event);
                expect(SearchFieldComponent.toJSON()).toMatchSnapshot();
            });

            test('renders max results in the search for results search', () => {
                event.target.value = 's';
                SearchFieldComponent = createComponent({
                    ...props,
                    maxResults: 7
                });

                component = SearchFieldComponent.toJSON();
                input = component.children[0].children[0];
                input.props.onChange(event);
                expect(SearchFieldComponent.toJSON()).toMatchSnapshot();
            });
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
                expect(results.children.length).toBe(
                    mockStatus.length > 5 ? 5 : mockStatus.length
                );
            });
        });

        describe('Content: friends', () => {
            propsField.content.friends = mockFriends;
            delete propsField.content.status;
            let component = createComponent(propsField).toJSON();
            const results = component.children[1];

            test('get the renders friends content to match search', () => {
                expect(results.children.length).toBe(
                    mockFriends.length > 5 ? 5 : mockFriends.length
                );
            });
        });

        describe('Content: status & friends', () => {
            propsField.content.status = mockStatus;
            let component = createComponent(propsField).toJSON();
            const results = component.children[1];
            const contentResults = [
                ...mockStatus,
                ...mockFriends
            ];

            test('get the renders the status & friends content to match search', () => {
                expect(results.children.length).toBe(
                    contentResults.length > 5 ? 5 : contentResults.length
                );
            });
        });
    });
});
