import '../components/__mocks__/fetch'
import { mockFriends } from '../components/__mocks__/components'
import { FETCH_REQUEST } from './callAPImiddleware'
import { API, HEADERS } from '../constants'

const mock_fetch = jest.fn(fetch);
global.fetch = mock_fetch;

describe('Middleware: FETCH_REQUEST', () => {
    describe('fetch friends', () => {
        beforeEach(async () => {
            await FETCH_REQUEST('friends');
        });

        test('fetch get the simple request', () => {
            expect(fetch).toHaveBeenCalledWith(API.concat('friends'), {
                method: 'GET', headers: HEADERS
            });
        });

        test('non fetch request with body when not passed body data', () => {
            const fetch_params = Object.keys(fetch.mock.calls[0][1]);
            expect(fetch_params).not.toEqual(expect.arrayContaining(
                ['body']
            ));
        });

        test('fetch request with body data to post method', async () => {
            await FETCH_REQUEST('friends', 'POST', {...mockFriends[0]});
            const fetch_params = Object.keys(fetch.mock.calls[1][1]);
            expect(fetch_params).toEqual(expect.arrayContaining(
                ['body']
            ));
        });

        test('should be catch in request', async () => {
            spyOn(console, 'error');
            await FETCH_REQUEST();
            expect(console.error).toHaveBeenCalledWith('endpoint not found');
        });

        afterEach(() => {
            fetch.mockClear();
        });
    });
});
