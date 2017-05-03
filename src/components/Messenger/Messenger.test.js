import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends } from '../__mocks__/components'
import Messenger from './Messenger.jsx'
const propsMessenger = {friends: mockFriends};

const createComponent = props => ReactRender.create(
    <Messenger {...props} />
);

const MessengerComponent = createComponent(propsMessenger);
let component = MessengerComponent.toJSON();

describe('Component: Messenger', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    describe('onUpdateFriendStatus', () => {
        jest.useFakeTimers();
        beforeEach(() => {
            component = createComponent(propsMessenger);
            jest.runOnlyPendingTimers();
        });

        test('renders status like online of a random friend', () => {
            expect(component.toJSON()).toMatchSnapshot();
        });

        test('clear the interval when the component was unmounted', () => {
            component.unmount();
            expect(clearInterval).toHaveBeenCalled();
        });

        afterEach(() => {
            jest.clearAllTimers();
        });
    });
});
