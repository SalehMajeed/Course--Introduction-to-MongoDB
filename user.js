const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	betaUser: {
		type: Boolean,
		default: false,
	},
	birthDate: Date,
	pets: [{ type: String }],
	address: {
		other: Boolean,
		street: String,
		houseNumber: Number,
		zip: Number,
		city: String,
		State: String,
	},
});


module.exports = mongoose.model('user', user_schema);
