const Router = require('koa-router');
const router = new Router();
const svgCaptcha = require('svg-captcha');
router.get('/api/verifcode', ctx => {
    const codeConfig = {
        size: 4, // 验证码长度
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
        noise: 3, // 干扰线条的数量
        width: 160,
        height: 50,
        fontSize: 50,
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#eee',
    };
    const captcha = svgCaptcha.create(codeConfig);
    ctx.session.verifCode = captcha.text.toLowerCase(); // 存session用于验证接口获取文字码
    ctx.body = captcha.data;
});

module.exports = router;
