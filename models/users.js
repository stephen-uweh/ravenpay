const db = require("../config/dbConfig.js");
const {knex} = require("knex");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
// GET ALL USERS
const find = () => {
  return db("users");
};
const { v4: uuid4 } = require("uuid");

// GET SPECIFIC USER BY PARAM
const findOne = (param) => {
  knex.transaction(async function(trx) {
    return await trx('users').where(param);
  });
};



// ADD A USER
const addUser = async (user) => {
  let newUser = await knex('users').insert(user);
  return newUser;
  // knex.transaction( function(trx) {
  //   return await trx.insert(user).into('users');
  // });
};

const generateToken  = function (user) {
  const token = jwt.sign(
    {
      id: user.userId,
      email: user.email,
      user: user,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 60 * 24 * 90 }
  );
  knex('users').where('userId', user.userId).update({token: token});
  return token
};


const encryptPassword = function(password){
  let salt = uuid4();
  let hashed = crypto.createHmac("sha1", salt).update(password).digest("hex");
  return hashed
}

// // UPDATE USER
// const updateUser = (id, post) => {
//   return db("users")
//     .where("id", id)
//     .update(post);
// };

// // REMOVE USER
// const removeUser = id => {
//   return db("users")
//     .where("id", id)
//     .del();
// };

module.exports = {
  find,
  findOne,
  addUser,
  generateToken,
  encryptPassword
};
