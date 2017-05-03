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
    { id: 6, user: '', image: '', favorite: false }
];

export const getBoundingClientRect =
    (offsets={top: 40, left: 40}) => ({
        width: 120,
        height: 120,
        ...offsets
    });

export const Element = {
    value: 'my new value',
    getBoundingClientRect,
    focus: () => true,
    parentNode: Element
};

export const eventMock = {
    target: {...Element},
    stopPropagation: () => true,
    stopImmediatePropagation: () => true,
    preventDefault: () => true,
    currentTarget: {
        ...Element,
        parentNode: {
            ...Element,
            parentNode: {...Element}
        }
    }
};

export const document = {
    ...Element,
    body: {
        ...Element,
        getBoundingClientRect: () => getBoundingClientRect({
            top: 70,
            left: 200
        })
    }
};

export const window = {
    scrollTo: (x,y) => ({x,y}),
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
