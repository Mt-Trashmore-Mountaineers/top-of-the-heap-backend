'use strict'

//REQUIREMENTS
require('dotenv').config();
const PORT = process.env.PORT || 3002;

const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const Quiz = require('./models/quiz.js')


//MONGOOSE CONNECTION
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


//ROUTES 
app.get('/',(req, res) => {
  res.status(200).send("Welcome, Mongoose is connected.");
})


app.post('/new',postQuiz);

app.get('/quiz/email', getQuizSet);

app.get('/quiz', getQuizzes);

app.get('/quiz/id', getQuizById);


async function postQuiz(req,res,next){
  console.log('!! quiz req.body', req.body);
  try {
    let createdQuiz = await Quiz.create(req.body);
      res.status(200).send(createdQuiz);
  } catch (error) {
    next(error)
  }
}

async function getQuizById(req,res,next){
  let id = req.query.id;
  
  try {
    let quiz = await Quiz.findById(id);
      res.status(200).send(quiz);
  } catch (error) {
    next(error);
  }
}

async function getQuizSet(req,res,next){
  let reqEmail = req.query.email;
  try {
    let results = await Quiz.find({email: reqEmail});
    res.status(200).send(results);
  } catch (error) {
    next(error)
  }
}

async function getQuizzes(req,res,next){
  try {
    let results = await Quiz.find({});
    res.status(200).send(results);
  } catch (error) {
    next(error)
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
