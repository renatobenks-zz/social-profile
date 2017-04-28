import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockStatus, mockFriends, eventMock } from '../__mocks__/components'
import Status from './Status.jsx'
const status = {
    ...mockStatus[0],
    user: mockFriends[0],
    date: 2,
    like: {active: false, value: 0}
};

const StatusComponent = ReactRender.create(
    <Status status={status} />
);

const component = StatusComponent.toJSON();

describe('Component: Status', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    describe('activeLike', () => {
        const content = component.children[1];
        const meta = content.children[content.children.length-1];
        const link = meta.children[0];

        test('should like status when click into like', () => {
            link.props.onClick(eventMock);
            const component = StatusComponent.toJSON();
            expect(component).toMatchSnapshot();
        });

        test('should bot like status when click into like was clicked', () => {
            link.props.onClick(eventMock);
            const component = StatusComponent.toJSON();
            expect(component).toMatchSnapshot();
        });
    });
});
