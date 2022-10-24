const MSG_ERRORS = Object.freeze({
  ACCOUNT_EXIST: "Account already exist.",
  ACCOUNT_INVALID: "Invalid email or password",
  SUSPENDED: "Account is suspended!",
  INACTIVE: "Account is inactive!",
  NOT_FOUND: "Not Found",
  ACCESS_DENIED: "Access denied.",
  SESSION_EXPIRED: "Access denied. Your session has expired",
  DEACTIVATED: "Your account isn't activate",
  SERVER_ERROR: "Server Error!",
  PASSWORD_MISMATCH: "Password mismatch",
});

const MSG_SUCCESS = Object.freeze({
  ACCOUNT_CREATED: "Account Successfully Created.",
  ACCOUNT_VERIFIED: "Account Successfully Verified",
  PIN_SET: "Pin Set Successfully",
  WELCOME: "Welcome",
  RESOUCES_FETCHED: "Resources fetched Successfully.",
  FORGOT_PASSWORD: "Password request sent successfully",
  FORGOT_PASSWORD_SUCCESS: "Password reset successfully",
  TRANSACTION_SUCCESSFULL: "Transaction Successfull",
  TRANSACTION_DECLINED: "Transaction Declined",
  DEPOSITS_FETCHED: "Deposits fetched Successfully.",
  TRANSFERS_FETCHED: "Transfers fetched Successfully.",
  TRANSACTIONS_FETCHED: "Transactions fetched Successfully.",
});

const MSG_TYPES = Object.freeze({
  ACCOUNT_EXIST: "ACCOUNT_EXIST",
  ACCOUNT_CREATED: "ACCOUNT_CREATED",
  RESOURCES_CREATED: "RESOURCES_CREATED",
  ACCOUNT_INVALID: "ACCOUNT_INVALID",
  NOT_FOUND: "NOT_FOUND",
  LOGGED_IN: "LOGGED_IN",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  ACCESS_DENIED: "ACCESS_DENIED",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  DEACTIVATED: "DEACTIVATED",
  PERMISSION: "PERMISSION",
  DELETED: "DELETED",
  UPDATED: "UPDATED",
  SERVER_ERROR: "SERVER_ERROR",
  CREATED: "CREATED",
  FETCHED: "FETCHED",
  ACCOUNT_VERIFIED: "ACCOUNT_VERIFIED",
  PASSWORD_MISMATCH: "PASSWORD_MISMATCH",
  VALIDATION_ERROR: "VALIDATION ERROR (INVALID INPUT)",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
});

module.exports = {
  MSG_ERRORS,
  MSG_SUCCESS,
  MSG_TYPES,
};
