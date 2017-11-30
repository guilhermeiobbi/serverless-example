'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

class UserResource {
	create(event, callback) {
		const newUser = JSON.parse(event.body);
		
		newUser.id = uuid.v1();
		newUser.updatedAt = new Date().getTime();
	
		const params = {
			TableName: 'users',
			Item: newUser
		};
	
		return dynamoDb.put(params, (error, data) => {
			if (error) {
				return callback(error)
			}
			callback(error, params.Item);
		});
	};

	findOne(event, callback) {
		const params = {
			TableName: 'users',
			Key: {
				id: event.pathParameters.id
			}
		};
	  
		return dynamoDb.get(params, (error, data) => {
			if (error) {
				return callback(error);
			}
			callback(error, data.Item);
		});
	};

	findAll(event, callback) {
		const params = {
			TableName: 'users',
		};
		
		return dynamoDb.scan(params, (error, data) => {
			if (error) {
				return callback(error);
			}
			callback(error, data.Items);
		});
	};

	update(event, callback) {
		const data = JSON.parse(event.body);
	  
		data.id = event.pathParameters.id;
		data.updatedAt = new Date().getTime();
	  
		const params = {
			TableName : 'users',
			Item: data
		};
	  
		return dynamoDb.put(params, (error, data) => {
			if (error) {
				return callback(error);
			}
			callback(error, params.Item);
		});
	};

	delete(event, callback) {
		const params = {
			TableName : 'users',
			Key: {
				id: event.pathParameters.id
			}
		};

		return dynamoDb.delete(params, (error, data) => {
			if (error) {
				return callback(error);
			}
			callback(error, params.Key);
		});
	};
}

module.exports = UserResource;