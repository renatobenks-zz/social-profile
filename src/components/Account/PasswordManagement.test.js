import React from 'react'
import ReactRender from 'react-test-renderer'

import { eventMock } from '../__mocks__/components'
import ManagementAccount from './ManagementAccount.jsx'
import PasswordManagement from './PasswordManagement.jsx'

const onUpdateContent = content => ({content});

const ManagementAccountComponent = new ManagementAccount({
    password: true,
    onUpdateContent
});

const onChangeContentMock = jest.fn(ManagementAccountComponent.onChangeContent);
const PasswordManagementComponent = ReactRender.create(
    <PasswordManagement onChangeContent={onChangeContentMock} />
);

const component = PasswordManagementComponent.toJSON();
describe('Component: PasswordManagement', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders the form to change password when click in link', () => {
        const link = component.children[0];
        link.props.onClick(eventMock);
        expect(PasswordManagementComponent.toJSON()).toMatchSnapshot();
        expect(onChangeContentMock).toHaveBeenCalled();
    });
});
