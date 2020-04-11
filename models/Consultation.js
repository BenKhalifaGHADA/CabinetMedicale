
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ConsultationSchema = new Schema({
        user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
        observation:{
          type: String,
        }, 
        date:{
          type:Date,
          default:Date.now(),
        },
        ordonnance:
        [{
          drug:{
            type:String,
          },
          dose:{
            type:String,
          },
          duration:{
            type:String,
          },
         
        } ] 
      
});

module.exports = Consultation = mongoose.model("consultations", ConsultationSchema);
