import React from 'react'
import ReactRender from 'react-test-renderer'

import Content from './Content.jsx'

const content = [
    <img key="logo" src="logo.svg" alt="logo" />,
    <p key="text">To get started, edit and save to reload.</p>,
    <code key="observation">Obs.: edit src/App.js</code>
];

const createComponent = content => ReactRender.create(
    <Content>
        {content}
    </Content>
);

const component = createComponent(content);

describe('Component: Content', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    describe('Row', () => {
        test('renders row grid content', () => {
            expect(createComponent(<Content.Row>{content}</Content.Row>))
                .toMatchSnapshot();
        });

        describe('Column', () => {
            test('renders columns in row content grid', () => {
                expect(createComponent(
                    <Content.Row>
                        <Content.Column width="8">
                            {content}
                        </Content.Column>
                    </Content.Row>
                )).toMatchSnapshot();
            });
        });
    });
});
