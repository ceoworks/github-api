var db = require('../db').thunk,
	bcrypt = require('../utils/bcrypt');

module.exports = {
	createUser: function *(name, pass) {
		var userAlreadyExists, passHash, salt, result;
		userAlreadyExists = yield db.User.collection.findOne({username: name});
		if (userAlreadyExists) {
			throw new Error('Specified name is already taken');
		}
		salt = yield bcrypt.salt();
		passHash = yield bcrypt.hash(pass, salt);
		result = yield db.User.collection.insert({username: name, hash: passHash});
		if (!result) {
			throw new Error('Could not create user');
		}
		return { name: name };
	}
};
