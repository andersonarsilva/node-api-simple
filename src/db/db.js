const mysql = require('mysql'),
	fs = require('fs');

require('dotenv').config();

const connection_config = {
	connectionLimit: process.env.app_connection_limit || 20,
	host: process.env.app_host || 'localhost',
	user: process.env.app_user || 'user',
	connectTimeout: 1000,
	acquireTimeout: 1000,
	timeout: 1000,
	password: process.env.app_password || 'pwd',
	database: process.env.app_database || 'mysql',
	multipleStatements: true,
	timezone: 'local'
};

const connection = mysql.createPool(connection_config);

connection
.on('connection', function () {
    console.log('POOL => conexão')
})
.on('error', function (error) {
    console.log( error )
})
.on('release', function () {
    // console.log('POOL => conexão released')
});

const query = {
    query: async (sql) => {
        return new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                if (err) {
                    resolve(false);
                    return false;
                } 
                conn.query(sql, (err, result) => {
                    conn.release();
                    if (err) {
                        console.error( err );
                        resolve(false);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    },
    insert: async (sql, data) => {
        return new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                    return false;
                } 
                conn.query(sql, data, (err, result) => {
                    conn.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    },
    update: async (sql, data) => {
        return new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                    return false;
                } 
                conn.query(sql, data, (err, result) => {
                    conn.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    },
    db: async () => {
        return connection
    }
};

module.exports = query;