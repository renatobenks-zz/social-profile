import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends } from '../__mocks__/components'
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
describe('Component: Account', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders component with content children', () => {
        expect(createComponent(<p>Hello world</p>)).toMatchSnapshot();
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
