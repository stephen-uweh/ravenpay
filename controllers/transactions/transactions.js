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
const { notificationPayload } = require("../../util/notificationPayload");


exports.retrieveDeposits = async(req, res) => {
    let deposits = await Transaction.retrieveDeposits(req.user.id);
    return JsonResponse(
        res,
        200,
        MSG_SUCCESS.DEPOSITS_FETCHED,
        deposits,
        null
      );
};


exports.retrieveTransfers = async(req, res) => {
    let transfers = await Transaction.retrieveTransfers(req.user.id);
    return JsonResponse(
        res,
        200,
        MSG_SUCCESS.TRANSFERS_FETCHED,
        transfers,
        null
      );
};


exports.transactionsHistory = async(req, res) => {
    let transactions = await Transaction.transactionsHistory(req.user.id);
    return JsonResponse(
        res,
        200,
        MSG_SUCCESS.TRANSACTIONS_FETCHED,
        transactions,
        null
      );
};


exports.notification = async(req, res) => {
  // Send Notification
    let subject = "Bank Alert";
    let data = req.body.data
    let payLoad = notificationPayload(
      req.body.data.email,
      req.body.message,
      req.body.data.account_name,
      req.body.data.account_number,
      data
    );
    let topic = "notification-email";
    publishMessage(JSON.stringify(payLoad), topic);
}