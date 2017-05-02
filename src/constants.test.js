import { API, ENDPOINTS } from './constants'

describe('Constants', () => {
    describe('API', () => {
        test('the initial url should be rightly from integration API', () => {
            expect(API).toBe('https://api.backand.com/1/objects/');
        });
    });

    describe('ENDPOINTS', () => {
        describe('FRIENDS', () => {
            test('get the initial endpoint to get list of friends', () => {
                expect(ENDPOINTS.FRIENDS.endpoint).toBe('friends');
            });

            test('get the initial params to request', () => {
                expect(ENDPOINTS.FRIENDS.params).toEqual({
                    pageNumber: 1,
                    pageSize: 20
                });
            });

            describe('get_endpoint', () => {
                test('get the complete endpoint to get friends list with params', () => {
                    expect(ENDPOINTS.FRIENDS.get_endpoint()).toBe(
                        `${ENDPOINTS.FRIENDS.endpoint}?pageNumber=1&pageSize=20`
                    );
                });

                describe('get_params', () => {
                    test('get the correspondents params to request', () => {
                        expect(ENDPOINTS.FRIENDS.get_params()).toBe(
                            'pageNumber=1&pageSize=20'
                        );
                    });

                    test('changing pageNumber from request', () => {
                        ENDPOINTS.FRIENDS.params.pageNumber++;
                        expect(ENDPOINTS.FRIENDS.params.pageNumber).toBe(2);
                        expect(ENDPOINTS.FRIENDS.get_params()).toBe(
                            'pageNumber=2&pageSize=20'
                        );
                    });
                });
            });
        });
    })
});
