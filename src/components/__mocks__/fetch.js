import { window } from './components'
const { friends } = window.INITIAL_STATE;
export const fetch = (url, params) => {
    return new Promise((resolve, reject) => {
        url = url.split('/').pop().split('?');
        const path = url[0];
        process.nextTick(() => {
            switch (path) {
                case 'friends':
                    resolve({
                        json: () => ({
                            ...friends,
                            data: friends.data
                                .map(friend => ({
                                    id: friend.id*10,
                                    name: friend.user === 'Desconhecido'
                                        ? '' : friend.user,
                                    avatar: friend.image === 'desconhecido.png'
                                        ? '' : friend.image
                                }))
                        })
                    });
                    break;
                default:
                    reject(console.error('endpoint not found'));
                    break;
            }
        });
    });
};

global.fetch = fetch;
