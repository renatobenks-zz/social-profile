import React from 'react'
import ReactRender from 'react-test-renderer'

import { window, eventMock } from '../__mocks__/components'
import ManagementAccount from './ManagementAccount.jsx'

global.window = window;
const onUpdateContent = jest.fn((content) => ({content}));
const propsManagementAccount = {
    onUpdateContent
};

const createComponent = (props={}) => ReactRender.create(
    <ManagementAccount {...props} />
);

const ManagementAccountComponent = createComponent();
const component = ManagementAccountComponent.toJSON();
describe('Component: Management', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders management with change password link', () => {
        expect(createComponent({
            ...propsManagementAccount,
            password: true
        })).toMatchSnapshot();
    });

    describe('openChangePassword', () => {
        const ManagementAccountComponent = new ManagementAccount(
            propsManagementAccount
        );

        beforeEach(() => {
            ManagementAccountComponent.openChangePassword(eventMock);
        });

        test('should update content when open to change password', () => {
            expect(onUpdateContent).toHaveBeenCalled();
        });
    });
});
