module.exports = (db) => {
    return {
        getCategories: async function() {
            let sql = '';
            let preparedValues = [];

            sql = 'SELECT `id`,`name`,`created_at` as `createdAt` FROM `categories`';

            let [categories] = await db.query(
                sql
            );

            return categories;
        }
    }
}
