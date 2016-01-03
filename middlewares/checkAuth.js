var db = require('../db').thunk,
	wrap = require('co-express');

module.exports = wrap(function *(req, res, next) {
	var token = req.headers.token || req.params.token;
	if (!token) {
		throw new Error('Token is missing');
	}

	var session = yield db.Session.collection.findOne({sid: token});
	if (!session) {
		throw new Error('Token not found');
	}
	return next();
});
