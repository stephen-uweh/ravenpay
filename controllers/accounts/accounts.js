const { v4: uuid4 } = require("uuid");
const knex = require("knex");
const Users = require("../../models/users");
const jwt = require("jsonwebtoken");
const Account = require("../../models/accounts");
const Transaction = require("../../models/transactions");
const { JsonResponse } = require("../../lib/apiResponse");
const { publishMessage } = require("../../services/emailWorker");
const { emailPayload } = require("../../util/emailPayload");
const {
  MSG_SUCCESS,
  MSG_TYPES,
  MSG_ERRORS,
  SUPPORTED_INTEGRATIONS,
} = require("../../constant/msg");
const axios = require("axios");
const qs = require("qs");
const validate = require("../../validation");

exports.setPin = async (res, req) => {
  try {
    let data = Account.setPin(req.user.id, req.body.pin);
    return JsonResponse(res, 200, MSG_SUCCESS.PIN_SET, data, null);
  } catch (error) {
    console.log(error);
    return JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, null, null);
  }
};

exports.getBalance = async (res, req) => {
  try {
    let account = Account.findByParam({ userId: req.user.id });
    return JsonResponse(res, 200, MSG_SUCCESS.RESOUCES_FETCHED, account, null);
  } catch (error) {
    console.log(error);
    return JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, null, null);
  }
};

exports.deposit = async (req, res) => {
  const { error } = validate.transferValidation.validateDepositDetails(
    req.body
  );
  if (error)
    return JsonResponse(res, 400, error.details[0].message, null, null);

  let payload = {
    trx_ref: req.body.trx_ref,
    amount: req.body.amount,
    senderName: req.body.name,
    recipientName: req.body.account_name,
    recipientAccountNumber: req.body.account_number,
    recipientBank: req.body.bank,
    transactionStatus: req.body.status,
    narration: req.body.narration,
    type: "Credit",
  };

  let newTransfer = Transaction.addTransaction(payload);
  let accountDetails = Account.findByParam({
    accountNumber: newTransfer.recipientAccountNumber,
  });
  let total = accountDetails.balance + newTransfer.amount;
  Account.updateBalance(accountDetails.userId, total);
  return JsonResponse(
    res,
    200,
    MSG_SUCCESS.TRANSACTION_SUCCESSFULL,
    newTransfer,
    null
  );
};




exports.makeTransfer = async (req, res) => {
  const { error } = validate.transferValidation.validateTransferDetails(
    req.body
  );
  if (error)
    return JsonResponse(res, 400, error.details[0].message, null, null);
  let payload;
  let resp;

  let accountDetails = Account.findByParam({ userId: req.user.id });

  // Check PIN
  let salt = uuid4();
  let hashedPin = crypto
    .createHmac("sha1", salt)
    .update(req.body.pin)
    .digest("hex");
  if (accountDetails.PIN != hashedPin) {
    let msg = {
      message: "Transaction Declined. Incorrect Pin",
    };
    return JsonResponse(res, 403, MSG_SUCCESS.TRANSACTION_DECLINED, msg, null);
  }

  // Check account balance
  if (accountDetails.balance < req.body.amount) {
    let msg = {
      message: "Transaction Declined. Insufficient Funds",
    };
    return JsonResponse(res, 403, MSG_SUCCESS.TRANSACTION_DECLINED, msg, null);
  }

  // Check for amount limit
  if (req.body.amount > 100) {
    let msg = {
      message: "Transaction Declined. Above transfer limit",
    };
    return JsonResponse(res, 403, MSG_SUCCESS.TRANSACTION_DECLINED, msg, null);
  }

  var data = qs.stringify({
    amount: req.body.amount,
    bank_code: req.body.bank_code,
    bank: req.body.bank,
    account_number: req.body.account_number,
    account_name: req.body.account_name,
    narration: req.body.narration,
    reference: uuid4(),
    currency: req.body.currency,
  });
  var config = {
    method: "post",
    url: "https://integrations.getravenbank.com/v1/transfers/create",
    headers: {},
    data: data,
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      resp = JSON.stringify(resp.data);
      payload = {
        trx_ref: resp.trx_ref,
        amount: resp.amount,
        senderId: req.user.id,
        senderName: accountDetails.fullname,
        recipientName: resp.account_name,
        recipientAccountNumber: resp.account_number,
        recipientBank: resp.bank,
        transactionStatus: resp.status,
        narration: resp.narration,
        type: "Debit",
      };

      let newTransfer = Transaction.addTransaction(payload);

      let total = accountDetails.balance - (resp.amount + resp.fee);
      Account.updateBalance(req.user.id, total);

      return JsonResponse(
        res,
        200,
        MSG_SUCCESS.TRANSACTION_SUCCESSFULL,
        newTransfer,
        null
      );
    })
    .catch(function (error) {
      console.log(error);
      return JsonResponse(res, 500, MSG_TYPES.SERVER_ERROR, null, null);
    });
};


