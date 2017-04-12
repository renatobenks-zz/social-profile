import React from 'react';
import ReactRender from 'react-test-renderer';

import Content from './Content.jsx';
const ContentComponent = ReactRender.create(
    <Content>
        <p>
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
    </Content>
);
const component = ContentComponent.toJSON();

describe('Component: Content', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });
});
