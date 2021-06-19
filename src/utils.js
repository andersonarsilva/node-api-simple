module.exports = {
    resHttp: function(res, data, code = 200, type = 'application/json'){
        if( ( res.cancelRequest || false ) ) return false;
        res.setHeader('Content-Type', type);
        switch( code ){
            case 200: 
                return res.status(code).send(data);
            break;
            default:
                return res.status(code).send(data);
        }
    }
};