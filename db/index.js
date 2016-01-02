var thunkify = require('thunkify');
var tingo = require('tingodb')();
var db = new tingo.Db('./data', {});

var models = {
	User: db.collection('users'),
	Comment: db.collection('comments'),
	thunk: {}
};

Object.keys(models).forEach(function (modelKey) {
	if (modelKey === 'thunk') {
		return;
	}

	models.thunk[modelKey] = { collection: {} };
	['find', 'findOne', 'findAndModify', 'insert', 'update', 'remove', 'count'].forEach(function (operation) {
		models.thunk[modelKey].collection[operation] = thunkify(models[modelKey][operation].bind(models[modelKey]));
	});
});

module.exports = models;
