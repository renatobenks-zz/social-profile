import React from 'react'
import ReactRender from 'react-test-renderer'

import { eventMock, mockStatus } from '../components.mock';
import SearchFilter from './SearchFilter.jsx'

const App = {
    filtersDisabled: (filterDisabled) => ({filterDisabled})
};

const propsSearchFilterComponent = {
    label: "Searching for",
    content: mockStatus,
    checkFilterDisabled: (filterDisabled) =>
        App.filtersDisabled(filterDisabled)
};

const SearchFilterComponent = ReactRender.create(
    <SearchFilter {...propsSearchFilterComponent}/>
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
            expect(component).toMatchSnapshot();
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
});
