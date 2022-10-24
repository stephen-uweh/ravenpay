const express = require("express");
const router = express.Router();
const user = require("../controllers/users");
const {accounts} = require("../controllers/accounts");
const authMiddleWare = require("../middlewares/auth");


router.post('/deposit', accounts.deposit);
router.post('/transfer', authMiddleWare, accounts.makeTransfer);
router.post('/set-pin', authMiddleWare, accounts.setPin);
router.get('/get-balance', authMiddleWare, accounts.getBalance);

module.exports = router;