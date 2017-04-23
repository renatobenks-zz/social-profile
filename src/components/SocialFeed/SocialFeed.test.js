import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockStatus, mockFriends, eventMock } from '../__mocks__/components'
import SocialFeed from './SocialFeed.jsx'

const propsSocialFeed = {
    content: {status: mockStatus, friends: mockFriends}
};

const createComponent = props => ReactRender.create(
    <SocialFeed {...props} />
);

const SocialFeedComponent = createComponent(propsSocialFeed);
let component = SocialFeedComponent.toJSON();

describe('Component: SocialFeed', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    describe('activeLike', () => {
        const feed = component.children[component.children.length-1];
        const status = feed.children[0];
        const content = status.children[1];
        const meta = content.children[content.children.length-1];
        const like = meta.children[0];

        test('should like status when click into like', () => {
            like.props.onClick(eventMock);
            component = SocialFeedComponent.toJSON();
            expect(component).toMatchSnapshot();
        });

        test('should bot like status when click into like was clicked', () => {
            like.props.onClick(eventMock);
            component = SocialFeedComponent.toJSON();
            expect(component).toMatchSnapshot();
        });
    });
});
