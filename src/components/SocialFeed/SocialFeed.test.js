import React from 'react'
import ReactRender from 'react-test-renderer'

import SocialFeed from './SocialFeed.jsx'

const SocialFeedComponent = ReactRender.create(
    <SocialFeed>
        <p>Hello World!</p>
    </SocialFeed>
);
let component = SocialFeedComponent.toJSON();

describe('Component: SocialFeed', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });
});
