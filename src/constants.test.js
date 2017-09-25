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
        });
    });

    describe('STATUS', () => {
        test('get the initial endpoint to get list of status', () => {
            expect(ENDPOINTS.STATUS.endpoint).toBe('status');
        });

        test('get the initial params to request', () => {
            expect(ENDPOINTS.STATUS.params).toEqual({
                pageNumber: 1,
                pageSize: 20
            });
        });
    });

    describe('get_endpoint', () => {
        test('get endpoint with params to request', () => {
            expect(ENDPOINTS.get_endpoint(ENDPOINTS.FRIENDS)).toBe(
                `${ENDPOINTS.FRIENDS.endpoint}?pageNumber=1&pageSize=20`
            );
        });

        test('should get params to set endpoint with params correctly to request', () => {
            spyOn(ENDPOINTS, 'get_params');
            ENDPOINTS.get_endpoint(ENDPOINTS.STATUS);
            expect(ENDPOINTS.get_params).toHaveBeenCalledWith(ENDPOINTS.STATUS);
        });
    });

    describe('get_params', () => {
        test('get the correspondents params to request', () => {
            expect(ENDPOINTS.get_params(ENDPOINTS.STATUS)).toBe(
                'pageNumber=1&pageSize=20'
            );
        });

        test('changing pageNumber from request', () => {
            ENDPOINTS.FRIENDS.params.pageNumber++;
            expect(ENDPOINTS.FRIENDS.params.pageNumber).toBe(2);
            expect(ENDPOINTS.get_params(ENDPOINTS.FRIENDS)).toBe(
                'pageNumber=2&pageSize=20'
            );
        });
    });

    describe('set_page_number', () => {
        test('should return new endpoint object with page number updated', () => {
            const ENDPOINT = ENDPOINTS.set_page_number(ENDPOINTS.STATUS, 3);
            expect(ENDPOINTS.STATUS.params.pageNumber).toBe(1);
            expect(ENDPOINT.params.pageNumber).toBe(3);
        });
    });
});
