var wrap = require('co-express'),
	authService = require('../services/authService');

var getToken = wrap(function *(req, res) {
	var data = yield authService.createToken(req.params.name, req.params.pass);
	return res.send(data);
});

module.exports = function (app) {
	app.get('/auth', getToken);
};
