const mongoose = require('mongoose');
const connect = () => mongoose.connect('mongodb://localhost:27017/whatever');

const school = new mongoose.Schema({
	district: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'district',
	},
	name: {
		type: String,
		unique: false,
	},
	openSince: Number,
	students: Number,
	isGreat: Boolean,
	staff: [{ type: String }],
});

school.index(
	{
		district: 1,
		name: 1,
	},
	{
		unique: true,
	}
);

school.pre('save', function () {
	console.log('Before Save');
});

school.virtual('staffCount').get(function () {
	return this.staff.length;
});

const School = mongoose.model('school', school);

connect()
	.then(async connection => {
		const mySchool = await School.create({
			name: 'my school',
			staff: ['v', 'f', 'fsa'],
		});

		console.log(mySchool.staffCount);
	})
	.catch(e => console.error(e));
