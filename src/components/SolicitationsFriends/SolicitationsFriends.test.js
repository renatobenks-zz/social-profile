import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends } from '../__mocks__/components'

import SolicitationsFriends from './SolicitationsFriends.jsx'
const component = ReactRender.create(
    <SolicitationsFriends friends={mockFriends} />
);

describe('Component: SolicitationsFriends', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });
});
