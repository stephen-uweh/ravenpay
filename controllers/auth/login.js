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



exports.loginToUser = async (req, res) => {
    try {
      const { error } = validate.usersValidation.validateLogin(req.body);
      if (error)
        return JsonResponse(res, 400, error.details[0].message, null, null);
  
      // find the user trying to login
      const user = Users.findOne({
        email: req.body.email.toLowerCase(),
        isActive: true,
      });
      if (!user)
        return JsonResponse(res, 400, MSG_TYPES.ACCOUNT_INVALID, null, null);
  
      // compare request password with the password saved on the database
      let validPassword =
        Users.encryptPassword(req.body.password) === user.password;
      if (!validPassword)
        return JsonResponse(res, 400, MSG_TYPES.ACCOUNT_INVALID, null, null);
  
      //get user token if password is correct
      let token = Users.generateToken(user);
  
      let date = new Date();
      let expiresDate = new Date(date.setDate(date.getDate() + 90));
      let expiresDateString = expiresDate.toUTCString();
  
      res.cookie("t", token, { expire: expiresDateString });
  
      JsonResponse(res, null, MSG_TYPES.LOGGED_IN, token, null);
      return;
    } catch (error) {
      JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, null, null);
      return;
    }
  };
  