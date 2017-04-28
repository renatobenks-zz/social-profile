import React from 'react'
import ReactRender from 'react-test-renderer'

import { window, eventMock } from '../__mocks__/components'
import BreadcrumbRoute from './BreadcrumbRoute.jsx'

global.window = window;
const createComponent = (props={}) => ReactRender.create(
    <BreadcrumbRoute {...props} />
);

describe('Component: BreadcrumbRoute', () => {
    test('renders without crash', () => {
        expect(createComponent()).toMatchSnapshot();
    });

    test('renders breadcrumb route default', () => {
        expect(createComponent({default: true})).toMatchSnapshot();
    });

    describe('onDirectionLink', () => {
        const BreadcrumbRouteComponent = createComponent({default: true});
        const link = BreadcrumbRouteComponent.toJSON().children[0];
        test('should direct link when click in route link', () => {
            link.props.onClick(eventMock);
            expect(BreadcrumbRouteComponent.toJSON()).toMatchSnapshot();
        });
    });
});
