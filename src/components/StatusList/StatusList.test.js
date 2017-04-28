import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockStatus, mockFriends } from '../__mocks__/components'
const propsStatusList = {
    content: {status: mockStatus, friends: mockFriends}
};

import StatusList from './StatusList.jsx'
const component = ReactRender.create(
    <StatusList {...propsStatusList} />
);

describe('Component: StatusList', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });
});
