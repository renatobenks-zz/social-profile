import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends } from '../__mocks__/components'
import FriendsList from './FriendsList.jsx'

const propsFriendsList = {
    friends: mockFriends
};

const createComponent = props =>
    ReactRender.create(
        <FriendsList {...props} />
    );

const FriendsListComponent = createComponent(propsFriendsList);
const component = FriendsListComponent.toJSON();

describe('Component: FriendsList', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });
});
