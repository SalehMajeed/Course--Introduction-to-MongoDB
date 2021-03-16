const mongoose = require('mongoose');

// Connect Function for connect to mongodb that return promise
const connect = () => {
	return mongoose.connect('mongodb://localhost:27017/whatever');
};

// Create Schema
const student = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			unique: true,
		},

		fave_foods: [{ type: String }],

		info: {
			school: {
				type: String,
			},

			shoe_size: {
				type: Number,
			},
		},
	},
	{
		timestamps: true,
	}
);

// Create Model
const Student_model = mongoose.model('student', student);

connect()
	.then(async connection => {
		// Fill Value
		const student = await Student_model.create({
			firstName: 'tim',
		});

		const found = await Student_model.find({
			firstName: 'thi',
		});

		const found_by_id = await Student_model.findById('2131213j');

		const updated = await Student_model.findByIdAndUpdate('sfd2', {});

		console.log(student);
		console.log(found);
		console.log(found_by_id);
		console.log(updated);
	})
	.catch(e => console.error(e));
