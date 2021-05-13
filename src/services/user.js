const config = require('../config');
const crypto = require('crypto');

module.exports = (db) => {
    return {
        getUserByUsername: async (username) => {
            let sql = '';
            let preparedValues = [];

            sql = "SELECT `id`, `username`, `password`, `is_admin` as `isAdmin`, `avatar`, `created_at` as `createdAt`, `last_logined_at` as `lastLoginedAt` FROM `users` WHERE `username`=?";
            preparedValues = [username];

            let [[user]] = await db.query(sql, preparedValues);

            return user;
        },

        addUser: async (username, password) => {
            // 密码加密
            const hmac = crypto.createHmac('sha256', config.user.passwordSalt);
            password = hmac.update(password).digest('hex');
            const createdAt = Date.now();

            let sql = '';
            let preparedValues = [];

            sql = "INSERT INTO `users` (`username`, `password`, `created_at`, `last_logined_at`) VALUES (?,?,?,?)";
            preparedValues = [username, password, Date.now(), 0];

            let [{ insertId }] = await db.query(sql, preparedValues);

            return {
                id: insertId,
                username,
                password,
                createdAt
            };
        }
    }
}
