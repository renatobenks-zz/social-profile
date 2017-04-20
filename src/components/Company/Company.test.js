import React from 'react'
import ReactRender from 'react-test-renderer'

import Company from './Company.jsx'

const propsCompany = {logo:'logo.png'};
const createComponent = (props, content) => {
    if (!content) return ReactRender.create(
        <Company {...props} />
    );

    return ReactRender.create(
        <Company {...props}>
            {content}
        </Company>
    );
};

const CompanyComponent = createComponent(propsCompany, 'my company info');
const component = CompanyComponent.toJSON();

describe('Component: Company', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('default renders logo with no content', () => {
        const component = createComponent(propsCompany).toJSON();
        expect(component.children.length).toBe(1);
        const linkLogo = component.children[0];
        const logo = linkLogo.children[0];
        expect(logo.type).toBe('img');
        expect(logo.props.src).toBe('logo.png');
    });

    test('renders logo with image logo into props', () => {
        expect(component.children.length).toBe(2);
        expect(component.children[1]).toBe('my company info');
    });
});
