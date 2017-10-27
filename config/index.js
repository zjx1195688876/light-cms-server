module.exports = {
    session: {
        key: 'user-session',
        maxAge: 86400000
    },
    origin: process.env.NODE_ENV === 'production'
                ? '*'
                : 'http://localhost:8080'
};
