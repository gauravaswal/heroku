const mongoose = require('mongoose');
const mongooseLeanGetters = require('mongoose-lean-getters')
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const loginSchema = Schema({
  loginType:{
    type: String,
    enum : ['Web','Device'],
    default: 'Web'
  },
  token:{
  type:String,
  required:true
  },
  _user:{
      text:String,
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     require:true
  }
}, {timestamps:true});

loginSchema.plugin(mongooseLeanGetters)
loginSchema.plugin(uniqueValidator)



module.exports = mongoose.model('Login', loginSchema);
