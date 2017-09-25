import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends } from '../__mocks__/components'
import Messenger from './Messenger.jsx'

const propsMessenger = {
    friends: mockFriends
};

const createComponent = props => ReactRender.create(
    <Messenger {...props} />
);

jest.useFakeTimers();
let MessengerComponent = createComponent(propsMessenger);
const component = MessengerComponent.toJSON();
describe('Component: Messenger', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    describe('onUpdateFriendStatus', () => {
        beforeEach(() => {
            MessengerComponent = createComponent(propsMessenger);
            jest.runOnlyPendingTimers();
        });

        test('renders status like online of a random friend', () => {
            expect(MessengerComponent.toJSON()).toMatchSnapshot();
        });

        test('clear the interval when the component was unmounted', () => {
            MessengerComponent.unmount();
            const interval = clearInterval.mock.calls[0][0];
            expect(clearInterval).toHaveBeenCalledWith(interval);
        });

        afterEach(() => {
            jest.clearAllTimers();
        });
    });
});
