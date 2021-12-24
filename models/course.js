const mongoose = require('mongoose');

// Course Modal Schema
const courseSchema = new mongoose.Schema({
	_id: Number,
	name: String,
	category: String
});

module.exports = mongoose.model('course', courseSchema);