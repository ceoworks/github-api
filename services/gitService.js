var request = require('co-request'),
	config = require('config');

var options = {
	url: config.github.base,
	json: true
};

module.exports = {
	getRepos: function *(user) {
		options.url += '/users/' + user + '/repos';
		options.headers = { 'User-Agent': user };

		return (yield request(options)).body;
	},
	searchRepos: function *(user, key) {
		options.url += '/search/repositories';
		options.qs = { q: key + '+user:' + user };
		options.headers = { 'User-Agent': user };

		return (yield request(options)).body;
	},
	filterRepos: function *(user, filter) {
		options.url += '/search/repositories';
		options.qs = { q: filter + '+in:name+user:' + user };
		options.headers = { 'User-Agent': user };

		return (yield request(options)).body;
	}
};
