import React from 'react'
import ReactRender from 'react-test-renderer'

import Title from './Title.jsx'

const propsTitle = {
    title: 'My app title'
};

const createComponent = (props={}, content='') => ReactRender.create(
    <Title {...props}>
        {content}
    </Title>
);

const TitleComponent = createComponent(propsTitle);
const component = TitleComponent.toJSON();

describe('Component: Title', () => {
    test('render component without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders title with subtitle', () => {
        const component = createComponent(
            {...propsTitle, subtitle: 'My subtitle'}
        );

        expect(component).toMatchSnapshot();
    });

    test('renders content children in', () => {
        const component = createComponent(<img src="logo.svg" alt="logo"/>);
        expect(component).toMatchSnapshot();
    });

    test('no renders content missing content, title and subtitle', () => {
        const component = createComponent();
        expect(component).toMatchSnapshot();
    });
});
