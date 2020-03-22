const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  address: {
    region: {
      type: String,
      required: true,
    },
    State: {
      type: String,
    },
    Country:{
      type:String,
    },
    ZipCode:{
      type:String,
    }
  },
  isonline: {
    type: Boolean,
    default: false,
  },
  birthdate:{
    type: Date
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
