const express = require("express");
const router = express.Router();
const {Comment} = require("../models/");

router.post("/", (req, res) => {

    Comment.create({
      ...req.body, 
    })
      .then(newBlog => {
        console.log(newBlog)
        res.json(newBlog);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "ERROR", err });
      });
  });


module.exports = router;