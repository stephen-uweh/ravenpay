const express = require("express");
const router = express.Router();
const {transactions} = require("../controllers/transactions");
const authMiddleWare = require("../middlewares/auth");



router.get('/deposits', authMiddleWare, transactions.retrieveDeposits);
router.get('/transfers', authMiddleWare,  transactions.retrieveTransfers);
router.get('/transactions', authMiddleWare, transactions.transactionsHistory);

module.exports = router;