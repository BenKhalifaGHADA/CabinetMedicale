const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAppointmentInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.date = !isEmpty(data.date) ? data.date : "";
  data.time = !isEmpty(data.time) ? data.time : "";
  data.typeVisite = !isEmpty(data.typeVisite) ? data.typeVisite : "";

  // date checks
  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  } 
  // Time checks
  if (Validator.isEmpty(data.time)) {
    errors.time = "Time field is required";
  }

   // Type visite checks
   if (Validator.isEmpty(data.typeVisite)) {
    errors.typeVisite = "Type Visite field is required";
  }

 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
