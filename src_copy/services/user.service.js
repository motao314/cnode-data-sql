const jsonWebToken = require('jsonwebtoken');
const Service = require('../service');
const config = require('../config');
const crypto = require('crypto');
// const HTTP_CODE = require('../constants/http.code');
// const BUSINESS_CODE = require('../constants/business.code');
const koaBody = require('koa-body');

module.exports = class UserService extends Service {

    constructor(ctx) {
        super(ctx);
    }

    /**
     * @name 用户注册
     * @description 用户注册 
     * @param {*} username 要注册的用户名
     * @param {*} password 注册用户对应的密码
     * @param {*} repassword 重复密码
     * @Error {*}
     * @Return {
     *      id: number,
     *      username: string
     * }
     */
    async register(username, password, repassword) {
        username = (typeof username === 'string' ? username : '').trim();
        password = (typeof password === 'string' ? password : '').trim();

        if (!username || !password) {
            this.ctx.throw(400, {
                code: 100000,
                message: '用户名和密码不允许为空'
            });
        }

        if (password !== repassword) {
            this.ctx.throw(400, {
                code: 100101,
                message: '两次输入密码不一致'
            })
        }

        password = crypto.createHash('sha256').update(password).digest('hex');

        let [[existsUser]] = await this.ctx.state.db.query(
            "select `id` from `user` where `username`=?",
            [username]
        );
        if (existsUser) {
            this.ctx.throw(409, {
                code: 100102,
                message: '用户名已存在'
            });
        }

        // todos: 数据库查询
        let [{ insertId }] = await this.ctx.state.db.query(
            "insert into `user` (`username`, `password`, `created_at`, `updated_at`) values (?, ?, ?, ?)",
            [username, password, Date.now(), Date.now()]
        );

        return {
            id: insertId,
            username
        };
    }

    /**
     * @name 用户登录
     * @description 用户登录
     * @param {*} username 登录用户的用户名
     * @param {*} password 登录用户的密码
     */
    async login(username, password) {
        username = (typeof username === 'string' ? username : '').trim();
        password = (typeof password === 'string' ? password : '').trim();

        if (!username || !password) {

            this.ctx.throw(400, {
                code: 100000,
                message: '用户名和密码不允许为空'
            });
        }

        password = crypto.createHash('sha256').update(password).digest('hex');

        let [[user]] = await this.ctx.state.db.query(
            "select * from `user` where `username`=?",
            [username]
        );
        if (!user || user.password !== password) {
            this.ctx.throw(401, {
                code: 100201,
                message: '用户名或密码错误'
            });
        }
        const loginUser = {
            id: user.id,
            username: user.name
        }
        const token = jsonWebToken.sign(
            loginUser,
            config.auth.secretKey
        )
        this.ctx.set('Authorization', token);
        return loginUser;
    }

    async isExistsByUsername(username) {
        username = (typeof username === 'string' ? username : '').trim();

        if (!username) {
            this.ctx.throw(400, {
                code: 100301,
                message: '用户名不能为空'
            });
        }

        // TODO: 数据库查询
        let isExists = false;

        return isExists;
    }

    /**
     * 用户退出
     */
    async logout() {
        // TODO: 待开发
    }

    /**
     * 获取用户信息
     */
    async getProfile() {
        // TODO: 待开发
    }
}