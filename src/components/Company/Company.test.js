import React from 'react'
import ReactRender from 'react-test-renderer'

import Company from './Company.jsx'
const CompanyComponent = ReactRender.create(
    <Company logo="logo.png">
        my company info
    </Company>
);
const component = CompanyComponent.toJSON();

describe('Component: Company', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('default renders logo in company', () => {
        const component = ReactRender.create(
            <Company logo="logo.png"/>
        ).toJSON();
        const logo = component.children[0];
        expect(component.children.length).toBe(1);
        expect(logo.type).toBe('img');
        expect(logo.props.src).toBe('logo.png');
    });

    test('renders logo with image logo into props', () => {
        expect(component.children.length).toBe(2);
        expect(component.children[1]).toBe('my company info');
    });
});
