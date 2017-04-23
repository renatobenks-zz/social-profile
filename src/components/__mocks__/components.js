export const mockStatus = [
    { id: 1, user: 'Elton', text: 'nothing interesting' },
    { id: 2, user: 'Elton', text: 'status updated' },
    { id: 3, user: 'Elton', text: 'my status' },
    { id: 4, user: 'Vinicius', text: 'other status' }
];

export const mockFriends = [
    { id: 1, user: 'Elton', image: 'elton.png', favorite: true },
    { id: 2, user: 'Vinicius', image: 'vinicius.png', favorite: true }
];

export const eventMock = {
    target: {value: 'my new value'},
    stopPropagation: () => true,
    stopImmediatePropagation: () => true,
    preventDefault: () => true
};

export const window = {
    location: { pathname: '/' }
};
