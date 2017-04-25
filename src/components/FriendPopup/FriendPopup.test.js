import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends, eventMock } from '../__mocks__/components'
import FriendPopup from './FriendPopup.jsx'

const button = <button>Open popup</button>;
const propsFriendPopup = {
    friend: mockFriends[0]
};

const createComponent = (props={}, content='') => ReactRender.create(
    <FriendPopup {...props}>
        {content}
    </FriendPopup>
);

const FriendPopupComponent = createComponent(propsFriendPopup, button);
const component = FriendPopupComponent.toJSON();
describe('Component: FriendPopup', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders friend popup on hover in button', () => {
        component.props.onMouseEnter(eventMock);
        expect(FriendPopupComponent.toJSON()).toMatchSnapshot();
    });

    test('renders friend popup of a not favorite friend', () => {
        const props = {friend: mockFriends[1]};
        expect(createComponent(props, button)).toMatchSnapshot();
    });

    test('renders friend popup using content prop', () => {
        const props = {...propsFriendPopup, content: button};
        expect(createComponent(props)).toMatchSnapshot();
    });

    test('renders friend popup that that is not defined', () => {
        const friend = mockFriends[0];
        delete friend.user;
        const props = {friend: {...friend, user: ''}};
        expect(createComponent(props)).toMatchSnapshot();
    });
});
