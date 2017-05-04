import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends } from '../__mocks__/components'
import Messenger from './Messenger.jsx'

const mockActiveUsersOnline = jest.fn(({friends}) =>
    createComponent({...propsMessenger, friends})
);

const propsMessenger = {
    friends: mockFriends,
    activeUsersOnline (state) {
        return mockActiveUsersOnline(state);
    }
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
            const state = mockActiveUsersOnline.mock.calls[0][0];
            const { friends } = state;
            expect(mockActiveUsersOnline).toHaveBeenCalledWith(state);
            expect(createComponent({...propsMessenger, friends}))
                .toMatchSnapshot();
        });

        test('clear the interval when the component was unmounted', () => {
            MessengerComponent.unmount();
            const interval = clearInterval.mock.calls[0][0];
            expect(clearInterval).toHaveBeenCalledWith(interval);
        });

        afterEach(() => {
            jest.clearAllTimers();
            mockActiveUsersOnline.mockClear();
        });
    });
});
