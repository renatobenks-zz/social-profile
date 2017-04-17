import React from 'react';
import ReactRenderer from 'react-test-renderer';

import Filters from './Filters.jsx';
const entryFilters = [
    <input key="date" name="date" type="date"/>,
    <input key="user" name="user" type="text"/>
];

const FiltersComponent = ReactRenderer.create(
    <Filters label="My label title for my filters">
        {entryFilters}
    </Filters>
);

const component = FiltersComponent.toJSON();

describe('Component: Filters', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
        expect(component.type).toBe('div');
    });

    test('renders label like a title filters and filters entry', () => {
        expect(component.children.length).toBe(2);
    });

    test('renders a label component', () => {
        expect(component.children[0].type).toBe('h3');
        const label = component.children[0];
        expect(label.children.length).toBe(1);
        expect(label.children[0]).toBe('My label title for my filters');
    });

    describe('Filters entry:', () => {
        const filters = component.children[1];
        test('renders options from filter component', () => {
            expect(filters.type).toBe('div');
            expect((filters.children.length - 1)).toBe(entryFilters.length);
        });

        test('renders button for get options in filters and filter', () => {
            const button = filters.children[filters.children.length-1];
            expect(button.type).toBe('button');
            expect(button.children[0]).toBe('filter');
        });
    });
});
