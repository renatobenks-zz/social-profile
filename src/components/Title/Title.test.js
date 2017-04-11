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

    test('get title prop on component', () => {
        expect(component.children.length).toBe(1);
        expect(component.children[0]).toBe("My app title");
    });
});
