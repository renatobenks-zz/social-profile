import React from 'react'
import ReactRender from 'react-test-renderer'

import '../__mocks__/fetch'
import { mockFriends } from '../__mocks__/components'
import StatusList from './StatusList.jsx'

const propsStatusList = {
    users: mockFriends
};

const createComponent = (props={}) => ReactRender.create(
    <StatusList {...props} />
);

const StatusListComponent = createComponent(propsStatusList);
describe('Component: StatusList', () => {
    jest.useFakeTimers();
    test('renders without crash', async () => {
        const component = await StatusListComponent.toJSON();
        expect(component).toMatchSnapshot()
    });

    test('should display error in console when catch the update list status', async () => {
        const StatusListComponent = createComponent();
        expect(await StatusListComponent.toJSON()).toMatchSnapshot();
    });

    test('renders news status received from api into list', async () => {
        const StatusListComponent = createComponent(propsStatusList);
        jest.runOnlyPendingTimers();
        const component = await StatusListComponent.toJSON();
        expect(component).toMatchSnapshot();
        expect(setInterval).toHaveBeenCalled();
        jest.clearAllTimers();
    });

    test('should stop interval to get new status when unmout status list', async () => {
        const StatusListComponent = createComponent(propsStatusList);
        jest.runOnlyPendingTimers();
        StatusListComponent.unmount();
        expect(clearInterval).toHaveBeenCalled();
        jest.clearAllTimers();
    });
});
