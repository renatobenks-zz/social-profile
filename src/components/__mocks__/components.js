export const mockStatus = [
    { id: 1, user: 'Elton', text: 'nothing interesting' },
    { id: 2, user: 'Elton', text: 'status updated' },
    { id: 3, user: 'Elton', text: 'my status' },
    { id: 4, user: 'Vinicius', text: 'other status' }
];

export const mockFriends = [
    { id: 1, user: 'Elton', image: 'elton.png', favorite: true },
    { id: 2, user: 'Vinicius', image: 'vinicius.png', favorite: false },
    { id: 3, user: 'Desconhecido', image: 'desconhecido.png', favorite: false },
    { id: 4, user: 'Desconhecido', image: 'desconhecido.png', favorite: false },
    { id: 5, user: 'Desconhecido', image: 'desconhecido.png', favorite: true },
];

export const eventMock = {
    target: {value: 'my new value'},
    stopPropagation: () => true,
    stopImmediatePropagation: () => true,
    preventDefault: () => true,
    currentTarget: {
        getBoundingClientRect: () => ({
            width: '120px',
            height: '120px',
            top: '40px',
            left: '40px'
        })
    }
};

export const window = {
    location: { pathname: '/' },
    INITIAL_STATE: {
        title: 'My title app',
        subtitle: 'My monster subtitle',
        friends: {
            totalRows: mockFriends.length,
            pageNumber: Math.ceil(mockFriends.length/20),
            pageSize: 20,
            data: mockFriends
        },
        user: {
            name: 'renato',
            feed: {status: mockStatus},
            image: 'user.png'
        }
    }
};
