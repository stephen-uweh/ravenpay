const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const complexityOptions = {
  min: 5,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 0,
  requirementCount: 1,
};

function validateTransferDetails(user) {
  const Schema = Joi.object().keys({
    account_number: Joi.number().label("Accont Number").max(10).required(),
    amount: Joi.number().label("Amount").max(100).required(),
    bank_code: Joi.number().label("Number").max(100).required(),
  });

  return Schema.validate(user);
}

function validateDepositDetails(user) {
  const Schema = Joi.object().keys({
    account_number: Joi.number().label("Accont Number").max(10).required(),
    amount: Joi.number().label("Amount").max(100).required(),
    bank_code: Joi.number().label("Number").max(100).required(),
  });

  return Schema.validate(user);
}



module.exports = {
  validateTransferDetails,
  validateDepositDetails
};
