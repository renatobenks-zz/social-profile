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

    describe('Link', () => {
        test('get the renders link image', () => {
            expect(component.type).toBe('a');
        });

        test('get the link of image', () => {
            expect(component.props.href).toBe('/');
        });

        describe('Image', () => {
            const image = component.children[0];
            test('get the renders logo image', () => {
                expect(image.type).toBe('img');
            });

            test('get the image', () => {
                expect(image.props.src).toBe('logo.svg');
            });
        });
    });
});
