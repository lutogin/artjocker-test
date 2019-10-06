const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  UserName: String,
  FirstName: String,
  LastName: String,
  Age: {
    type: Number,
    min: 18,
    max: 99,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
