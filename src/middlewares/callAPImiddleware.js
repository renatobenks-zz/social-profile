import { API, HEADERS } from '../constants'
export const FETCH_REQUEST = async (ENDPOINT, method='GET', data) => {
    try {
        let props = {method, headers: HEADERS};
        props = !data ? props : {...props, body: JSON.stringify(data, 2, null)};
        return await fetch(String.prototype.concat(API, ENDPOINT), props)
            .then(data => data.json());
    } catch (e) {
        console.error(e);
    }
};

export default FETCH_REQUEST
