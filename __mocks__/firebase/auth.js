const getAuth = jest.fn(() => {
    return {
        currentUser: {
            uid: '12345',
        },
        signOut: () => {
            return Promise.resolve();
        }
    };
});


export {getAuth};
