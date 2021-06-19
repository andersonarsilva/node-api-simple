const User = require('./../models/User');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { resHttp } = require('./../utils')

require('dotenv').config();

module.exports = {
    async auth( req, res ){
        const { user, password } = req.query ;

        if( user === null ) return resHttp(res, {status: 'error', message: 'unauthorized'}, 401 );
        const data = await User.getUserByLogin( user );

        if( !data.length ) return resHttp(res, {status: 'error', message: 'unauthorized'}, 401 );

        const { user_id, pass, salt } = data[0];

        const hash = `${md5(`${md5(password)}${salt}`)}`;
        
        if( pass !== hash ) return resHttp(res, {status: 'error', message: 'unauthorized'}, 401 );

        const token = jwt.sign({ uid: user_id },  process.env.gedui_simetria_token || 'AndersonSilvaApi' );

        return resHttp(res, {status: 'success', access_token: token}, 200 );
    }
};