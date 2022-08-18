const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    email: {type: String, require:true},
    totalScore: {type: Number, default: 0}
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;