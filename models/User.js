const mongoose = require('mongoose');
const foc = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
  name: String,
  userid: String,
  updated_at: { type: Date, default: Date.now },
});

UserSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model('User', UserSchema);
