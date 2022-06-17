const express = require("express");
const router = express.Router();
const {User,Blog} = require("../models/");
const bcrypt  = require("bcrypt");

// FIND ALL USERS
router.get("/", (req, res) => {
  User.findAll({
    include:[Blog]
  })
    .then(dbUsers => {
      res.json(dbUsers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "ERROR", err });
    });
});
router.get("/logout",(req,res)=>{

  req.session.destroy(() => {

    res.redirect("/")
    console.log("USER LOGGED OUT")
  })
});
// FIND ONE USER
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id,{})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "ERROR", err });
    });
});

// CREATE A USER
router.post("/", (req, res) => {
  User.create(req.body)
    .then(newUser => {
      req.session.user = {
        id:newUser.id,
        username:newUser.username
      }
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "ERROR", err });
    });
});
router.post('/login', (req, res) => {
  User.findOne({
      where: {
          username: req.body.username
      }
  }).then(dbUserData => {
      if (!dbUserData) {
          res.status(400).json({message: 'No user account found!'});
          return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (! validPassword) {
          res.status(400).json({message: 'Incorrect password!'});
          return;
      }

      req.session.save(() => {
          req.session.userId = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json({user: dbUserData, message: 'You are now logged in!'});
      });
  });
});

// UPDATE USER
router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedUser => {
    res.json(updatedUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "ERROR", err });
  });
});

// DELETE A USER
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(delUser => {
    res.json(delUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "ERROR", err });
  });
});


module.exports = router;