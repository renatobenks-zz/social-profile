import React from 'react'
import ReactRender from 'react-test-renderer'

import { mockFriends } from '../__mocks__/components'
import Friend from './Friend.jsx'

const propsFriend = {
    messenger: false
};

const content = [
    <label key="label" htmlFor="friend">
        My friend
    </label>,
    <img key="image" id="friend" src="friend.png" alt="friend"/>
];

const createComponent = (props={}, content='') => ReactRender.create(
    <Friend {...props}>
        {content}
    </Friend>
);

const FriendComponent = createComponent(propsFriend, content);
const component = FriendComponent.toJSON();

describe('Component: Friend', () => {
    test('renders without crash', () => {
        expect(component).toMatchSnapshot();
    });

    test('renders friend not like a link with not width fluid', () => {
        expect(component.props.className.split(' ')).not.toEqual(
            expect.arrayContaining(['fluid'])
        );
    });

    test('renders friend like a link with width fluid', () => {
        const component = createComponent({messenger: true}, content)
            .toJSON();
        expect(component.props.className.split(' ')).toEqual(
            expect.arrayContaining(['fluid'])
        );
    });

    describe('Content', () => {
        test('renders content from messenger', () => {
            const component = createComponent(
                {messenger: true},
                <Friend.Content friend={mockFriends[0]} messenger>
                    {content}
                </Friend.Content>
            );

            expect(component).toMatchSnapshot();
        });

        test('renders content like not messenger', () => {
            const component = createComponent(
                propsFriend,
                <Friend.Content friend={mockFriends[0]}>
                    {content}
                </Friend.Content>
            );

            expect(component).toMatchSnapshot();
        });

        test('renders content with only one component', () => {
            const component = createComponent(
                {messenger: true},
                <Friend.Content friend={mockFriends[0]}>
                    {content[1]}
                </Friend.Content>
            );

            expect(component).toMatchSnapshot();
        });

        test('renders friend user like `Desconhecido` when user is not defined', () => {
            const component = createComponent(
                {messenger: true},
                <Friend.Content friend={{user: ''}}>
                    {content}
                </Friend.Content>
            );

            expect(component).toMatchSnapshot();
        });

        test('friend user popup should be enabled for show pop from friend', () => {
            const component = createComponent(
                {messenger: true},
                <Friend.Content popup friend={mockFriends[0]}>
                    {content}
                </Friend.Content>
            );

            expect(component).toMatchSnapshot();
        });

        describe('Description', () => {
            test('renders friend content description', () => {
                const component = createComponent(
                    propsFriend,
                    <Friend.Content friend={mockFriends[0]}>
                        <Friend.Content.Description>
                            My description
                        </Friend.Content.Description>
                    </Friend.Content>
                );

                expect(component).toMatchSnapshot();
            });
        });

        describe('Metadata', () => {
            const component = createComponent(
                propsFriend,
                <Friend.Content friend={mockFriends[0]}>
                    <Friend.Content.Metadata>
                        My metadata
                    </Friend.Content.Metadata>
                </Friend.Content>
            );

            expect(component).toMatchSnapshot();
        });
    });

    describe('Extra', () => {
        const component = createComponent(
            propsFriend,
            <Friend.Extra>
                My extras infos
            </Friend.Extra>
        );

        expect(component).toMatchSnapshot();
    });
});
