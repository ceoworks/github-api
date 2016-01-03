var crypto = require('crypto'),
	bcrypt = require('../utils/bcrypt'),
	db = require('../db').thunk;

module.exports = {
	createToken: function *(name, pass) {
		var user, isPass, session, operation;
		user = yield db.User.collection.findOne({username: name});
		if (!user) {
			throw new Error('User not found');
		}
		isPass = yield bcrypt.compare(pass, user.hash);
		if (!isPass) {
			throw new Error('Name or password are incorrect');
		}
		session = {
			user: user._id,
			sid: crypto.createHash('sha256').digest('hex')
		};
		operation = yield db.Session.collection.insert(session);
		if (!operation.length) {
			throw new Error('Could not create session');
		}
		return session;
	}
};
