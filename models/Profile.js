const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  profilephoto: {
    type: String,
    default: 'default.jpg',
  },
  
  firstname: {
    type: String,
    
  },
  lastname: {
    type: String,
   
  },
  address: {
    region: {
      type: String
     
    },
    State: {
      type: String
    },
    Country:{
      type:String,
    },
    ZipCode:{
      type:String
    }
  },
  // isonline: {
  //   type: Boolean,
  //   default: false,
  // },
  birthdate:{
    type: Date
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
    
  },
  bio: {
    type: String
  },
 
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  patient:[{
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
     },
    email: {
        type: String,
    },
    adresse:{
      type:String,
    },
    zipcode:{
      type:String,
    },
    state:{
      type:String,
    },
    country:{
      type:String,
    },
    gender: {
        type: String,
    },
    phone:{
      type: String,
    },
    Datebirth: {
        type: Date,
        
    },
    avatar: {
      type: String,
      default: 'default.jpg',
    },
    cnam:{
      type: String,
    },
    assurance:{
      type: String,
    },  
    profession:{
      type:String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    
}],
rendezvous:[{
    
    date: {
        type: Date,
        default: Date.now(),
        required:true,
    },
    time: {
        type:Date,
        required:true,
        
    },
    typeVisite: {
        type: String,
        required:true,
        
    },
    patient:{
        patientId:
        {
        type:String
      },
       firstname:{
         type:String,
       },
       lastname:{
         type:String,
       }

    }
}] ,

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
