/**
* @api {GET} /categories 获取分类列表
* @apiName getCategories
* @apiGroup Category 
* @apiVersion 0.1.0
*
* @apiSuccess {Number} id 分类ID 
* @apiSuccess {String} name 分类名称 
* @apiSuccess {Number} createdAt 分类添加时间 
*/
module.exports.getCategories = async (ctx, next) => {

    let categoryService = ctx.state.services.category;

    let categories = await categoryService.getCategories();

    ctx.body = categories;
}
