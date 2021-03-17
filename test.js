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
		school: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'school',
		},
	},
	{
		timestamps: true,
	}
);

const school = new mongoose.Schema({
	name: String,
});

// Create Model
const Student_model = mongoose.model('student', student);
const School = mongoose.model('school', school);

connect()
	.then(async connection => {
		// for_student();
		for_school();
	})
	.catch(e => console.error(e));

async function for_school() {
	const school = await School.create({ name: 'mlk elementry' });
	const student = await Student_model.create({
		firstName: 'Trisha',
		school: school._id,
	});

	const match = await Student_model.findById(student.id).populate('school').exec();

	console.log(match);
}

async function for_student() {
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
}
