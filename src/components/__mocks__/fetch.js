import { window, mockStatus } from './components'
const { friends } = window.INITIAL_STATE;
export const fetch = (url, params) => {
    return new Promise((resolve, reject) => {
        url = url.split('/').pop().split('?');
        const path = url[0];
        let data;
        process.nextTick(() => {
            switch (path) {
                case 'friends':
                    data = params.method === 'GET'
                        ? {...friends, data: friends.data.map(friend => ({
                            id: Math.ceil(friend.id*10.25),
                            name: friend.user || 'Desconhecido',
                            avatar: friend.image || 'desconhecido.png'
                        }))}
                        : {status: 'OK', data: params.body};
                    break;
                case 'status':
                    data = {
                        totalRows: mockStatus.length,
                        data: [
                            ...mockStatus,
                            {
                                id: 100,
                                text: 'dont know it',
                                user: '',
                                __metadata: {
                                    descriptives: {
                                        user: { label: '', value: '' }
                                    }
                                }
                            }
                        ]
                    };
                    break;
            }

            if (!data) return reject('endpoint not found');
            return resolve({
                json: () => (data)
            });
        });
    });
};

global.fetch = fetch;
