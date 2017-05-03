import React from 'react'
import ReactRender from 'react-test-renderer'

import { eventMock } from '../__mocks__/components'
import PasswordManagement from './PasswordManagement.jsx'

const PasswordManagementComponent = ReactRender.create(
    <PasswordManagement />
);

const component = PasswordManagementComponent.toJSON();
describe('Component: PasswordManagement', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    describe('onShowPassword', () => {
        const field = component.children[3];
        const checkbox = field.children[2];
        beforeEach(() => {
            checkbox.props.onChange(eventMock);
        });

        test('should show the latest password field', () => {
            expect(PasswordManagementComponent.toJSON()).toMatchSnapshot();
        });
    });

    describe('onChangePassword', () => {
        jest.useFakeTimers();
        beforeEach(() => {
            component.props.onSubmit(eventMock);
            jest.runAllTimers();
        });

        test('should change password', () => {
            expect(PasswordManagementComponent.toJSON()).toMatchSnapshot();
        });

        afterEach(() => {
            jest.clearAllTimers();
        });
    });
});
