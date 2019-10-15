'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Map to fields in the DB
const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
 
});

exports.model = mongoose.model('Book', bookSchema, 'books');