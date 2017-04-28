import React from 'react';
import ReactRender from 'react-test-renderer';

import Header from './Header.jsx';
const HeaderComponent = ReactRender.create(
    <Header>
        Text or component
    </Header>
);
const component = HeaderComponent.toJSON();

describe('Component: Header', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('get children to renders', () => {
        expect(component.children.length).toBe(1);
        expect(component.children[0]).toBe('Text or component');
    });
});
