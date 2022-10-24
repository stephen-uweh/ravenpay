const { v4: uuid4 } = require("uuid");
const knex = require("knex");
const Users = require("../../models/users");
const jwt = require("jsonwebtoken");
const Account = require("../../models/accounts");
const { JsonResponse } = require("../../lib/apiResponse");
const { publishMessage } = require("../../services/emailWorker");
const { emailPayload } = require("../../util/emailPayload");
const {
  MSG_SUCCESS,
  MSG_TYPES,
  MSG_ERRORS,
  SUPPORTED_INTEGRATIONS,
} = require("../../constant/msg");
const validate = require("../../validation");
// var axios = require("axios");
// var qs = require("qs");



exports.registerUser = async (req, res) => {

  try {
    const { error } = validate.usersValidation.validateUser(req.body);
    if (error)
      return JsonResponse(res, 400, error.details[0].message, null, null);

    const userExist = knex("users").where({email: req.body.email}).first();
    // console.log(userExist);
    if (userExist._eventsCount != 0)
      return JsonResponse(res, 400, MSG_TYPES.ACCOUNT_EXIST, null, null);

    req.body.userId = uuid4();
    req.body.isActive = true;

    req.body.password = Users.encryptPassword(req.body.password);

    // Create User
    const user = Users.addUser(req.body);

    let token = Users.generateToken(user);

    let accountNumber = Math.floor(Math.random() * 9999999999);

    let payload = {
      accountNumber: accountNumber,
      bank: "Raven",
      balance: 0.0,
      fullname: user.firstname + " " + user.lastName,
    };

    // Create Account for User
    let account = Account.addAccount(payload);

    
    // Send Email
    let subject = "Your account has been created!";
    let payLoad = emailPayload(
      user.email,
      subject,
      user.firstname,
      user.lastname,
      account.accountNumber
    );
    let topic = "registration-email";
    publishMessage(JSON.stringify(payLoad), topic);

    return JsonResponse(res, 200, MSG_TYPES.ACCOUNT_CREATED, {token: token, account: account}, null);
  } catch (error) {
    console.log(error);
    return JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, null, null);
  }
};
