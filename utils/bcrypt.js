var bcrypt = require('bcrypt'),
	thunkify = require('thunkify');

module.exports = {
	hash: thunkify(bcrypt.hash),
	salt: thunkify(bcrypt.genSalt),
	compare: thunkify(bcrypt.compare)
};
