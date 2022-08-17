

const mongoose = require('mongoose');

const {Schema} = mongoose;

const quizSchema = new Schema({
    title: {type: String, require: true},
    plays: {type: Number, default: 0},
    questions: {type: Array, require: true},
    email: {type: String, require:true}
});

const QuizModel = mongoose.model('Quiz', quizSchema);

module.exports = QuizModel;