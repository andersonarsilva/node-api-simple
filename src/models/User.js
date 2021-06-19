const db = require('../db/db');


const model = {
    getUserByLogin: async ( login ) => {
        return await db.query(`
            SELECT 
            u_c.user_id, u_c.\`user\`, u_c.pass, u_c.salt
            FROM
            user_credentials u_c
            WHERE
            u_c.\`user\` = '${login}' AND u_c.flag = 1
        `);
    },
    getUser: async () => {
        return 'oooo';
    }
}

module.exports = model