var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Patient = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    profile: {
        type: String,
        required: true
    },
    sexe: {
        type: String,
        required: true
    },
    Datebierth: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Patient', Patient);