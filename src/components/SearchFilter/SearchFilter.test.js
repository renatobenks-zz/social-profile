import React from 'react'
import ReactRender from 'react-test-renderer'

import { eventMock, mockStatus } from '../__mocks__/components';
import SearchFilter from './SearchFilter.jsx'

const App = {
    checkFilterDisabled: filterDisabled => {
        return filterDisabled;
    }
};

const propsSearchFilterComponent = {
    label: 'Searching for',
    content: mockStatus,
    checkFilterDisabled: filterDisabled => App.checkFilterDisabled(filterDisabled)
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
            expect(SearchFilterComponent.toJSON()).toMatchSnapshot();
        });

        test('check filter is not disabled when search filter its valid', () => {
            spyOn(App, 'checkFilterDisabled');
            input.props.onChange(eventMock);
            expect(App.checkFilterDisabled).toHaveBeenCalledWith(false);
        });

        test('check filter is disabled when search filter its invalid', () => {
            spyOn(App, 'checkFilterDisabled');

            eventMock.target.value = '';
            input.props.onChange(eventMock);
            expect(App.checkFilterDisabled).toHaveBeenCalledWith(true);

            eventMock.target.value = 'Searching for';
            input.props.onChange(eventMock);
            expect(App.checkFilterDisabled).toHaveBeenCalledWith(true);
        });
    });
});
