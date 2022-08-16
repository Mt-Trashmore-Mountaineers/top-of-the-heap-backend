'use strict'

//REQUIREMENTS
require('dotenv').config();
const PORT = process.env.PORT || 3002;

const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

//MONGOOSE CONNECTION
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
