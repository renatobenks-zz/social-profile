import React from 'react';
import ReactRender from 'react-test-renderer';

import Content from './Content.jsx';
const ContentComponent = ReactRender.create(
    <Content/>
);
const component = ContentComponent.toJSON();

describe('Component: Content', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });
});
