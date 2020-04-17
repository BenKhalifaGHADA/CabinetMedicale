const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateConsultationInput(data) {
  let errors = {};

  data.observation = !isEmpty(data.observation) ? data.observation : "";

  //observation checks
  if (Validator.isEmpty(data.observation)) {
    errors.observation = "observation field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
