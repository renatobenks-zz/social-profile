import React from 'react';
import ReactRender from 'react-test-renderer';

import Logo from './Logo.jsx';
const LogoComponent = ReactRender.create(
    <Logo logo="logo.svg"/>
);
const component = LogoComponent.toJSON();

describe('Component: Logo', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders HTML img element', () => {
        expect(component.type).toBe('img');
    });

    test('get prop logo', () => {
        expect(component.props.src).toBe('logo.svg');
    });
});
