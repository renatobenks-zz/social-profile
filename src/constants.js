export const API = 'https://api.backand.com/1/objects/';
export const ENDPOINTS = {
    FRIENDS: {
        endpoint: 'friends',
        params: {
            pageNumber: 1,
            pageSize: 20
        }
    },
    STATUS: {
        endpoint: 'status',
        params: {
            pageNumber: 1,
            pageSize: 20
        }
    },
    get_endpoint (OBJECT) {
        return OBJECT.endpoint.concat('?', this.get_params(OBJECT));
    },
    get_params ({params}) {
        return Object.keys(params).map(key =>
            key.concat('=', params[key])
        ).join('&');
    },
    set_page_number (OBJECT, pageNumber) {
        return {
            ...OBJECT,
            params: {
                ...OBJECT.params,
                pageNumber
            }
        };
    }
};

export const HEADERS = {
    'Content-Type': 'application/json',
    'AnonymousToken': '7e507e02-3eaf-401d-b3a9-a33e823d632f'
};
