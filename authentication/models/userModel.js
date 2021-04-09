const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

/** BCRYPT */

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favorites: Array
})

// check correct implementation of bcrypt here
userSchema.pre('save', async function (next){
  try {
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    return next();
  }
  catch (error) {
    return next('error in userschema pre ', error);
  }
});

userSchema.methods.comparePw = function(inputPw, cb) {
  bcrypt.compare(inputPw, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch)
  });
};

module.exports = mongoose.model('User', userSchema)