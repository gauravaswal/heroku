const mongoose = require('mongoose');
const mongooseLeanGetters = require('mongoose-lean-getters')
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const reviewSchema = Schema({
  
  comment :{
      type:String
  },
  rating:{
    type:Number,
    min: 0, 
    max: 5
  },
  _product:{
    text:String,
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Product',
     require:true
  },
  _user:{
    text:String,
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     require:true
  },
 
}, {timestamps:true});

reviewSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Review', reviewSchema);
