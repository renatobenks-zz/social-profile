import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends, eventMock } from '../__mocks__/components'
import Account from './Account.jsx'
const user = {
    ...mockFriends[0],
    name: 'renato',
    friends: mockFriends
};

const createComponent = (content='') => ReactRender.create(
    <Account user={user}>
        {content}
    </Account>
);

const AccountComponent = createComponent();
const component = AccountComponent.toJSON();
const header = component.children[0];
const content = component.children[1];
const buttons = content.children[1];

describe('Component: Account', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders component with content children', () => {
        expect(createComponent(<p>Hello world</p>)).toMatchSnapshot();
    });

    test('renders the popup opened with account configurations', () => {
        const icon = header.children[1];
        icon.props.onClick(eventMock);
        expect(AccountComponent.toJSON()).toMatchSnapshot();
    });

    describe('onBackHome', () => {
        const openNotificationsButton = buttons.children[2];
        const onBackHomeButton = buttons.children[0];
        test('renders the image user user with details popup', () => {
            openNotificationsButton.props.onClick(eventMock);
            onBackHomeButton.props.onClick(eventMock);
            expect(AccountComponent.toJSON()).toMatchSnapshot();
        });
    });

    describe('openSolicitationsFriends', () => {
        const openSolicitationsFriends = buttons.children[1];
        beforeEach(() => {
            openSolicitationsFriends.props.onClick(eventMock);
        });

        test('renders the solicitations of friendship', () => {
            expect(AccountComponent.toJSON()).toMatchSnapshot();
        });

        test('renders the solicitations of friendship closed before was opened', () => {
            openSolicitationsFriends.props.onClick(eventMock);
            expect(AccountComponent.toJSON()).toMatchSnapshot();
        });
    });

    describe('openNotifications', () => {
        const openNotificationsButton = buttons.children[2];
        beforeEach(() => {
            openNotificationsButton.props.onClick(eventMock);
        });

        test('renders the notifications that should be open', () => {
            expect(AccountComponent.toJSON()).toMatchSnapshot();
        });

        test('renders the notifications closed when before was opened', () => {
            openNotificationsButton.props.onClick(eventMock);
            expect(AccountComponent.toJSON()).toMatchSnapshot();
        });
    });

    describe('Management', () => {
        test('renders management without crash', () => {
            expect(createComponent(<Account.Management/>)).toMatchSnapshot();
        });

        test('renders management with content children', () => {
            expect(createComponent(
                <Account.Management>
                    <p>Hello world</p>
                </Account.Management>
            )).toMatchSnapshot();
        });
    });
});
