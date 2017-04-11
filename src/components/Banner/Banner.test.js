import React from 'react';
import ReactRender from 'react-test-renderer';

import Banner from './Banner.jsx';
const BannerComponent = ReactRender.create(
    <Banner banner="my-banner"/>
);
let component = BannerComponent.toJSON();
describe('Component: Banner', () => {
    const banner = new Banner({banner: 'my-banner'});

    const Welcome = component.children[0];
    const Message = Welcome.children[0];
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('state banner should be activated', () => {
        expect(component.props.className.split(' '))
            .toEqual(expect.arrayContaining(['active']));
        expect(banner.state.active).toBeTruthy();
    });

    describe('Banner activated', () => {
        test('renders only one into children', () => {
            expect(component.children.length).toBe(1);
        });

        test('renders Welcome with Message', () => {
            const props = {
                h1: 'Bem-vindo à',
                h3: 'PROFILES',
                img: 'my-banner'
            };

            for (let element of Message.children) {
                const assert = element.type === 'img' ?
                    expect(element.props.src) :
                    expect(element.children[0]);

                assert.toBe(props[element.type]);
                expect(Object.keys(props)).toEqual(
                    expect.arrayContaining([element.type])
                );
            }
        });
    });

    describe('Banner disable', () => {
        beforeEach(() => {
            Welcome.children[1].props.onClick({preventDefault: () => true});
        });

        test('disable banner with component non-active', () => {
            component = BannerComponent.toJSON();
            expect(component).toMatchSnapshot();
            let componentClass = component.props.className.split(' ');
            expect(componentClass)
                .not.toEqual(expect.arrayContaining(['active']));
            expect(componentClass)
                .toEqual(expect.arrayContaining(['non-active']));
            expect(component.children).toBeNull();
        });

        test('put banner above header with relative position', () => {
            setTimeout(() => {
                component = BannerComponent.toJSON();
                expect(component).toMatchSnapshot();
                expect(component.props.style).toEqual({position: 'relative'});
            }, 1500);
        });
    });
});
