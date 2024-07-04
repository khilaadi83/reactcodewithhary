const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstname: {
    type: String
   
  },
  password :{
    type: String,
    required : true
  },
  email: {
    type: String,
    required: true
  },
  
phone: {
  type: Number
},
timeStapm: {
  type: Date,
  default: Date.now
}
});


const Customer = mongoose.model('Users', customerSchema);

module.exports = Customer;