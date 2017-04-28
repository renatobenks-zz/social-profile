import React from 'react'
import ReactRender from 'react-test-renderer'

import { eventMock, window } from './__mocks__/components';

global.window = window;
const propsApp = {
    banner: 'banner.png',
    logo: 'logo.svg',
    ...window.INITIAL_STATE
};

import App from './App.jsx'
const AppComponent = ReactRender.create(
    <App {...propsApp} />
);

let component = AppComponent.toJSON();

describe('Component: App', () => {
    test('renders without crashing', () => {
        expect(component).toMatchSnapshot();
    });

    describe('filtersDisabled', () => {
        const getFiltersInApp = (component) => {
            for (let AppChild of component.children) {
                if (AppChild.props.className === 'App-header') {
                    return AppChild.children
                        .filter(child =>
                            child.props.className === 'App-filters'
                        )[0].children[1];
                }
            }
        };

        const getSearchFilter = (component) =>
            getFiltersInApp(component).children[0];

        const getFiltersButton = (component) =>
            getFiltersInApp(component).children[1];

        let input;
        beforeEach(() => {
            const search = getSearchFilter(component).children[0];
            input = search.children[0];
        });

        test('renders filters button not disabled', () => {
            input.props.onChange(eventMock);
            const component = AppComponent.toJSON();
            expect(component).toMatchSnapshot();
        });

        test('filters should be default disabled', () => {
            let FiltersButton = getFiltersButton(component);
            expect(FiltersButton.props.disabled).toBe(true);
        });

        test('filters its not disabled when search filter changes with valid value', () => {
            input.props.onChange(eventMock);
            let FiltersButton = getFiltersButton(AppComponent.toJSON());
            expect(FiltersButton.props.disabled).toBe(false);
        });

        test('filters its disabled when search filter changes with invalid value', () => {
            eventMock.target.value = '';
            input.props.onChange(eventMock);
            let FiltersButton = getFiltersButton(AppComponent.toJSON());
            expect(FiltersButton.props.disabled).toBe(true);

            eventMock.target.value = 'What you searching for?';
            input.props.onChange(eventMock);
            FiltersButton = getFiltersButton(AppComponent.toJSON());
            expect(FiltersButton.props.disabled).toBe(true);
        });
    });

    describe('onAddFriend', () => {
        const getContent = component =>
            component.children[3].children[0]
                .children[0].children[0].children[0];

        const getAccountContent = component => {
            const content = getContent(component);
            return content.children[0].children[1]
        };

        beforeEach(() => {
            let accountContent = getAccountContent(component);
            const buttons = accountContent.children[1];
            const openSolicitations = buttons.children[1];
            openSolicitations.props.onClick(eventMock);
            accountContent = getAccountContent(AppComponent.toJSON());
            const solicitations = accountContent.children[0];
            const solicitation = solicitations.children[0];
            const extra = solicitation.children[1];
            const actions = extra.children[0];
            const approve = actions.children[0];
            approve.props.onClick(eventMock);
        });

        test('renders the new friend added after pending friendship solicitation', () => {
            expect(AppComponent.toJSON()).toMatchSnapshot();
        });
    });
});
