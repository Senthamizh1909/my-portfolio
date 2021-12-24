const mongoose = require('mongoose');

// Student Modal Schema
const studentSchema = new mongoose.Schema({
	name: String,
	enroll: Number,
	courseId: Number
});

module.exports = mongoose.model('student', studentSchema);