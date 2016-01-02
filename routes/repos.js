var wrap = require('co-express'),
	gitService = require('../services/gitService');

var getRepos = wrap(function *(req, res) {
	var data = yield gitService.getRepos(req.params.id);
	return res.send(data);
});

var searchRepos = wrap(function *(req, res) {
	var data = yield gitService.searchRepos(req.params.id, req.params.key);
	return res.send(data);
});

var filterRepos = wrap(function *(req, res) {
	var data = yield gitService.filterRepos(req.params.id, req.params.key);
	return res.send(data);
});

module.exports = function (app) {
	app.get('/users/:id/repos', getRepos);
	app.get('/users/:id/search/:key', searchRepos);
	app.get('/users/:id/filter/:key', filterRepos);
};
