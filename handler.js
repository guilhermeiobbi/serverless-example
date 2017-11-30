'use strict';

const UserResource = require('./resource/user');
const User = new UserResource();

module.exports.create = (event, context, callback) => {
  User.create(event, (error, result) => {
		if(error) {
			console.log('Error >>>>>> ' + JSON.stringify(error));
			callback(new Error(error));
		}
		const response = {
			statusCode: 200,
			body: JSON.stringify(result)
		};

		context.succeed(response);
  });
};

module.exports.findAll = (event, context, callback) => {
  User.findAll(event, (error, result) => {
		const response = {
		statusCode: 200,
			body: JSON.stringify(result)
		};

		context.succeed(response);
  });
};

module.exports.findOne = (event, context, callback) => {
	User.findOne(event, (error, result) => {
		const response = {
		statusCode: 200,
			body: JSON.stringify(result)
		};

		context.succeed(response);
	});
};

module.exports.update = (event, context, callback) => {
  	User.update(event, (error, result) => {
		const response = {
			statusCode: 200,
			body: JSON.stringify(result)
		};

		context.succeed(response);
  	});
};

module.exports.delete = (event, context, callback) => {
  User.delete(event, (error, result) => {
		const response = {
			statusCode: 200,
			body: JSON.stringify(result),
		};

		context.succeed(response);
  });
};
