const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateConsultationInput(data) {
  let errors = {};

  data.drug = !isEmpty(data.drug) ? data.drug : '';
  data.dose = !isEmpty(data.dose) ? data.dose : '';
  data.duration = !isEmpty(data.duration) ? data.duration: '';

  

 
   
  // drug checks
  if (Validator.isEmpty(data.drug)) {
    errors.drug = "drug field is required";
  }
   // dose checks
   if (Validator.isEmpty(data.dose)) {
    errors.dose = "dose field is required";
  } 

    // duration checks
    if (Validator.isEmpty(data.duration)) {
        errors.duration = "duration field is required";
      }
  
   

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
