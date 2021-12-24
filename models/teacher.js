const mongoose = require('mongoose');

// Teacher Modal Schema
const teacherSchema = new mongoose.Schema({
	name: String,
	teacher_id: Number,
	courseId: Number
});

module.exports = mongoose.model('teacher', teacherSchema);