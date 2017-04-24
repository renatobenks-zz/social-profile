import React from 'react'
import ReactRender from 'react-test-renderer'

import Management from './Management.jsx'
const createComponent = (content='') => ReactRender.create(
    <Management>
        {content}
    </Management>
);

const ManagementComponent = createComponent();
const component = ManagementComponent.toJSON();
describe('Component: Management', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders management with content children', () => {
        expect(createComponent(<p>Hello world</p>)).toMatchSnapshot();
    });
});
