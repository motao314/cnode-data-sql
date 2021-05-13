const path = require('path');

module.exports = {
    router: {
        prefix: '/api'
    },
    user: {
        passwordSalt: 'kkb'
    },
    auth: {
        secretKey: 'cnode'
    },
    upload: {
        dir: path.resolve(__dirname, './public/avatar')
    },
    database: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '12345678',
        database: 'cnode'
    }
}