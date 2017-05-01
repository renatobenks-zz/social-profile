export const API = 'https://api.backand.com/1/objects/';
export const ENDPOINTS = {
    FRIENDS: {
        endpoint: 'friends',
        params: {
            pageNumber: 1,
            pageSize: 20
        },
        get_endpoint () {
            return this.endpoint.concat('?', this.get_params());
        },
        get_params () {
            return Object.keys(this.params).map(key =>
                key.concat('=', this.params[key])
            ).join('&');
        }
    }
};
