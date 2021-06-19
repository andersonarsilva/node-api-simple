const   express = require('express'),
        routes = express.Router();

const UserController = require('./controllers/UsesController');

routes.get('/', (req, res) => {
    return res.json({
        message: "It's Work!"
    });    
});

routes.get('/auth', UserController.auth);

module.exports = routes;