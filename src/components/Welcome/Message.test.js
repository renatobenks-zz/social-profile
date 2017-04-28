import React from 'react'
import ReactRender from 'react-test-renderer'

import Message from './Message.jsx'

const MessageComponent = ReactRender.create(
    <Message
        title="My title text"
        text="My subtext"
        image="image.png"
    />
);

const component = MessageComponent.toJSON();

describe('Component: Message', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders title, image and subtext', () => {
        expect(component.children.length).toBe(3);
    });

    test('first render title with value title prop', () => {
        const title =component.children[0];
        expect(title.type).toBe('h1');
        expect(title.children[0]).toBe('My title text');
    });

    test('second render the image with value image prop', () => {
        const image =component.children[1];
        expect(image.type).toBe('img');
        expect(image.props.src).toBe('image.png');
    });

    test('third render the subtext with value text prop', () => {
        const subtext =component.children[2];
        expect(subtext.type).toBe('h3');
        expect(subtext.children[0]).toBe('My subtext');
    });
});
