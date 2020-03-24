const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePatientInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  

  if (!Validator.isLength(data.firstname, { min: 2, max: 40 })) {
    errors.firstname = 'firstname needs to between 2 and 4 characters';
  }



  if (!Validator.isLength(data.lastname, { min: 2, max: 40 })) {
    errors.lastname = 'lastname needs to between 4 and 12 characters';
  }
  
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
