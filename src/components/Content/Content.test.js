import React from 'react'
import ReactRender from 'react-test-renderer'

import Content from './Content.jsx'

const content = [
    <img key="logo" src="logo.svg" alt="logo" />,
    <p key="text">To get started, edit and save to reload.</p>,
    <code>Obs.: edit src/App.js</code>
];

const createComponent = content => ReactRender.create(
    <Content>
        {content}
    </Content>
);

const ContentComponent = createComponent(content);
const component = ContentComponent.toJSON();

describe('Component: Content', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders content with two content children', () => {
        const component = createComponent([...content].splice(0,2));
        expect(component).toMatchSnapshot();
    });

    test('renders content with only one content children', () => {
        const component = createComponent([...content].pop()[0]);
        expect(component).toMatchSnapshot();
    });

    test('no renders content when content children is bigger than 3', () => {
        const component = createComponent([...content, <div>Anything says hello</div>]);
        expect(component).toMatchSnapshot();
    });
});
