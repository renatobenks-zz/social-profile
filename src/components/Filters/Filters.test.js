import React from 'react';
import ReactRenderer from 'react-test-renderer';

import Filters from './Filters.jsx';
const FiltersComponent = ReactRenderer.create(
    <Filters label="My label message for my filters">
        <input type="text"/>
    </Filters>
);
const component = FiltersComponent.toJSON();

describe('Component: Filters', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });
});
