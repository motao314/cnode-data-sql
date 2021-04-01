const BUSINESS_CODE = {
    USER: Object.freeze({
        USERNAME_AND_PASSWORD_IS_NOT_ALLOWED_TOBE_EMPTY: {
            code: 10001,
            message: '用户名和密码不允许为空'
        },
        USERNAME_OR_PASSWORD_IS_NOT_VERIFED: {
            code: 10002,
            message: '用户名或密码错误'
        }
    })
};
Object.freeze(BUSINESS_CODE);

module.exports = BUSINESS_CODE;