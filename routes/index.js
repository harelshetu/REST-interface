const express = require("express");
const Users = require("../models/data");
const {externalApi} = require('../util/functions');
const router = express.Router();

/**
 * this middleware get user from DB and store it in 
 * the response object
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getUserById(req, res, next) {
  let requestedUser;
  try {
    requestedUser = await Users.findOne({ where: { id: req.params.id } });
    if (requestedUser === null) {
      res.status(404).json({ msg: "user don't exist" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

  res.requestedUser = requestedUser;
  console.log("\n5\n");
  next();
}

/**
 * get all the users in the DB
 */
router.get("/", (req, res) => {
  Users.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log("get all user failed");
      res.status(500).json({ msg: err.message });
    });
});

/**
 * get user from Db
 */
router.get("/:id", getUserById, (req, res) => {
  res.json(res.requestedUser);
});


/**
 * create user and store it in the DB,
 * then it make an external api call and update
 * "isFinished column to true"
 */
router.post("/", (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).json({ msg: "missing fields" });
  }

  Users.create({ firstName: firstName, lastName: lastName, isFinished: 0 })
    .then(newUser => {
      console.log("saved in db - ", newUser);
      res.status(201).json(newUser);
      externalApi(newUser);
    })
    .catch(err => res.status(400).json({ msg: err.message })
    );
});

/**
 * delete user from the DB
 */
router.delete("/:id", (req, res) => {
  Users.destroy({ where: { id: req.params.id } })
    .then(user => {
        if(user){
            res.json({ msg: `user id: ${req.params.id} have been deleted` });
        }else{
            
            res.json({ msg: `user id: ${req.params.id} don't exist` });
        }
    })
    .catch(err => {
      res.status(500).json({ msg: err.message });
    });
});

/**
 * update user 
 */
router.patch("/:id", getUserById, (req, res) => {
  const { firstName, lastName } = req.body;
  
  if (typeof firstName !== 'undefined') {
    res.requestedUser.firstName = firstName;
  }
  console.log(lastName);
  if (typeof lastName !== 'undefined') {
    res.requestedUser.lastName = lastName;
  }

  res.requestedUser
    .save()
    .then(res.json(res.requestedUser))
    .catch(err => res.status(400).json({msg:err.message}));  
});

module.exports = router;
