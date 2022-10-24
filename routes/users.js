var express = require("express");
var router = express.Router();
const { users } = require("../controllers/users");
const { login } = require("../controllers/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", users.registerUser);
router.post("/login", login.loginToUser);

module.exports = router;
