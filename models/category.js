const mongoose = require('mongoose');
const mongooseLeanGetters = require('mongoose-lean-getters')
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const categorySchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
 
}, {timestamps:true});

categorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('Category', categorySchema);
