const mongoose = require('mongoose');
const mongooseLeanGetters = require('mongoose-lean-getters')
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const productSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description :{
      type:String
  },
  price:{
    type:Number
  },
  sold:{
    type:Number,
    default:0
  },
  quantity:{
    type:Number
  },
  shipping:{
    type: String,
    enum : [0,1],
    default: 0
  },
  _category:{
    text:String,
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Category',
     require:true
  },
  photo:{
    type: String,
     required:true  
  }
 
}, {timestamps:true});

productSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Product', productSchema);
