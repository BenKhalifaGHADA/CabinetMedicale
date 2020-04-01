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
  handle: {
    type: String,
    required:true,
    max: 40
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
  isonline: {
    type: Boolean,
    default: false,
  },
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
    CNAM:{
      type: String,
    },
    Assurance:{
      type: String,
    },  
    profession:{
      type:String,
    },
    date: {
        type: Date,
        default: Date.now
    }
}],
rendezvous:[{
    libelle:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
        
    },
    time: {
        type:Date,
        default: Date.time,
    },
    Message:{
        type: String
    },

    statusAppointment:{
        type:Boolean,
        default:false,
    },
    typeVisite: {
        type: String,
        
    },
   
    NbreVisiteEffectuer: {
        type: Number,
       
    },
    namepatient:{
      type:String,
    }
}] ,
consultation:[{
  observation:{
    type: String,
  }, 
  date:{
    type:Date,
    default:Date.now(),
  }
}] 
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
