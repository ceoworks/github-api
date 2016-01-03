var wrap = require('co-express'),
	userService = require('../services/userService');

var createUser = wrap(function *(req, res) {
	var data = yield userService.createUser(req.body.name, req.body.pass);
	return res.send(data);
});

module.exports = function (app) {
	app.post('/users', createUser);
};
