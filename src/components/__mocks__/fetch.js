import { window } from './components'
const { friends } = window.INITIAL_STATE;
export const fetch = (url, params) => {
    return new Promise((resolve, reject) => {
        url = url.split('/').pop().split('?');
        const path = url[0];
        process.nextTick(() => {
            switch (path) {
                case 'friends':
                    const data = params.method === 'GET'
                        ? {...friends, data: friends.data.map(friend => ({
                            id: Math.ceil(friend.id*10.5),
                            name: friend.user === 'Desconhecido'
                                ? '' : friend.user,
                            avatar: friend.image === 'desconhecido.png'
                                ? '' : friend.image
                        }))}
                        : {status: 'OK', data: params.body};
                    return resolve({
                        json: () => (data)
                    });
                    break;
            }

            return reject('endpoint not found');
        });
    });
};

global.fetch = fetch;
