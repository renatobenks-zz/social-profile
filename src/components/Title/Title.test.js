import React from 'react';
import ReactRender from 'react-test-renderer';

import Title from './Title.jsx';
const TitleComponent = ReactRender.create(
    <Title title="My app title"/>
);
const component = TitleComponent.toJSON();

describe('Component: Title', () => {
    test('render component without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('component should renders title', () => {
        expect(component.children.length).toBe(1);
        expect(component.type).toBe('div');
    });

    test('get title prop on component', () => {
        const title = component.children[0];
        expect(title.type).toBe('h1');
        expect(title.children).toEqual(
            expect.arrayContaining(['My app title'])
        );
    });

    describe('Title within subtitle', () => {
        const TitleComponent = ReactRender.create(
            <Title title="My title.My subtitle"/>
        );
        const component = TitleComponent.toJSON();

        test('renders title with subtitle', () => {
            expect(component).toMatchSnapshot();
            expect(component.children.length).toBe(2);
        });

        test('get title component', () => {
            const title = component.children[0];
            expect(title.type).toBe('h1');
            expect(title.children).toEqual(
                expect.arrayContaining(['My title'])
            );
        });

        test('get subtitle component', () => {
            const subtitle = component.children[1];
            expect(subtitle.type).toBe('h2');
            expect(subtitle.children).toEqual(
                expect.arrayContaining(['My subtitle'])
            );

        });
    });
});
