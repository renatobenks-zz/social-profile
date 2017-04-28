import React from 'react'
import ReactRender from 'react-test-renderer'

import Welcome from './Welcome.jsx'

const onCloseWelcome = () => true;

const WelcomeComponent = ReactRender.create(
    <Welcome onClose={onCloseWelcome}>
        Hello world (My message welcome)
    </Welcome>
);

const component = WelcomeComponent.toJSON();

describe('Component: Welcome', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders welcome message with button to close', () => {
        expect(component.children.length).toBe(2);
    });

    test('get welcome message', () => {
        const message = component.children[0];
        expect(message).toBe('Hello world (My message welcome)');
    });

    describe('Button: click', () => {
        const button = component.children[1];
        test('renders the button to close', () => {
            expect(button.type).toBe('button');
            expect(button.props.type).toBe('button');
            expect(button.children[0]).toBe('continuar');
        });

        test('click button to close welcome message', () => {
            expect(button.props.onClick()).toEqual(onCloseWelcome());
        });
    });
});
