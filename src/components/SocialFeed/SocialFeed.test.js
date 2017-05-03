import React from 'react'
import ReactRender from 'react-test-renderer'

import '../__mocks__'
import { eventMock, getBoundingClientRect } from '../__mocks__/components'
import SocialFeed from './SocialFeed.jsx'
const SocialFeedComponent = ReactRender.create(
    <SocialFeed>
        <p>Hello World!</p>
    </SocialFeed>
);
const component = SocialFeedComponent.toJSON();
describe('Component: SocialFeed', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    describe('onClickScroll', () => {
        jest.useFakeTimers();
        //using offset positions defines from mocks
        const timesToRunInterval = Math.ceil((70-40)/13);
        const message = component.children[component.children.length-1];
        const button = message.children[2];
        beforeEach(() => {
            spyOn(window, 'scrollTo');
            button.props.onClick(eventMock);
            jest.runOnlyPendingTimers();
        });

        test('renders document scrolled to the top content social feed', () => {
            expect(SocialFeedComponent.toJSON()).toMatchSnapshot();
        });

        test('should scroll document', () => {
            expect(window.scrollTo).toHaveBeenCalledWith(0, 13);
        });

        test('should stop scroll document when scrolled even top content social feed', () => {
            for (let i=1; i < timesToRunInterval; i++) {
                jest.runOnlyPendingTimers();
            }

            expect(window.scrollTo).toHaveBeenCalledWith(0, timesToRunInterval*13);
            expect(clearInterval).toHaveBeenCalled();
        });

        afterEach(() => {
            jest.clearAllTimers();
        });
    });
});
