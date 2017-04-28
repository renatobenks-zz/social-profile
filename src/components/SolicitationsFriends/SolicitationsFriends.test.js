import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends, eventMock } from '../__mocks__/components'
import SolicitationsFriends from './SolicitationsFriends.jsx'

const mockOnApproveFriend = jest.fn((friend) => ({friend}));
const propsSolicitationsFriends = {
    friends: [...mockFriends],
    onApproveFriend: mockOnApproveFriend
};

const createComponent = (props={}) => ReactRender.create(
    <SolicitationsFriends {...props} />
);

const SolicitationsFriendsComponent = createComponent(propsSolicitationsFriends);
const component = SolicitationsFriendsComponent.toJSON();

describe('Component: SolicitationsFriends', () => {
    const solicitation = component.children[0];
    const extra = solicitation.children[1];
    const actions = extra.children[0];

    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders message when not have friendships solicitations', () => {
        expect(createComponent()).toMatchSnapshot();
    });

    describe('onDeclineSolicitations', () => {
        const decline = actions.children[1];
        beforeEach(() => {
            decline.props.onClick(eventMock);
        });

        test('renders the pending friend solicitation declined', () => {
            expect(SolicitationsFriendsComponent.toJSON()).toMatchSnapshot()
        });
    });

    describe('onApproveSolicitations', () => {
        const approve = actions.children[0];
        beforeEach(() => {
            mockOnApproveFriend.mockClear();
            approve.props.onClick(eventMock);
        });

        test('renders the approve of friend from friendship pending solicitations', () => {
            expect(mockOnApproveFriend).toHaveBeenCalledWith(mockFriends[0]);
            expect(SolicitationsFriendsComponent.toJSON()).toMatchSnapshot();
        });
    });
});
