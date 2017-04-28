import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends } from '../__mocks__/components'
import Messenger from './Messenger.jsx'
const propsMessenger = {friends: mockFriends};

const createComponent = props => ReactRender.create(
    <Messenger {...props} />
);

const component = createComponent(propsMessenger);

describe('Component: Messenger', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders status like online of a random friend', () => {
        jest.useFakeTimers();
        const component = createComponent(propsMessenger);
        jest.runOnlyPendingTimers();
        expect(component).toMatchSnapshot();
        jest.clearAllTimers();
    });

    test('clear the interval when the component was unmounted', () => {
        jest.useFakeTimers();
        const component = createComponent(propsMessenger);
        jest.runOnlyPendingTimers();
        component.unmount();
        expect(clearInterval).toHaveBeenCalled();
        jest.clearAllTimers();
    });
});
