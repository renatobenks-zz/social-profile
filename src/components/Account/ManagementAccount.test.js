import React from 'react'
import ReactRender from 'react-test-renderer'

import { window } from '../__mocks__/components'
import ManagementAccount from './ManagementAccount.jsx'

global.window = window;
const propsManagementAccount = {};
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

    test('renders management with account configurations link', () => {
        expect(createComponent({
            ...propsManagementAccount,
            configure: true
        })).toMatchSnapshot();
    });
});
