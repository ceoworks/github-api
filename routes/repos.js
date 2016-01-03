var wrap = require('co-express'),
	gitService = require('../services/gitService');

var getRepos = wrap(function *(req, res) {
	var data = yield gitService.getRepos(req.params.userId);
	return res.send(data);
});

var searchRepos = wrap(function *(req, res) {
	var data = yield gitService.searchRepos(req.params.userId, req.params.key);
	return res.send(data);
});

var filterRepos = wrap(function *(req, res) {
	var data = yield gitService.filterRepos(req.params.userId, req.params.key);
	return res.send(data);
});

module.exports = function (app) {
	app.get('/repos/:userId', getRepos);
	app.get('/repos/:userId/search/:key', searchRepos);
	app.get('/repos/:userId/filter/:key', filterRepos);
};
