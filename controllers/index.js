const express = require('express');
const router = express.Router();

// ROUTE FOR COMMENTS
const commentsRoutes = require("./commentsRoutes");
router.use("/api/comments",commentsRoutes)

// ROUTE FOR USERS
const userRoutes = require("./userRoutes");
router.use("/api/users",userRoutes)

// ROUTE FOR BLOGS
const blogRoutes = require("./blogRoutes");
router.use("/api/blogs",blogRoutes)

// ROUTE FOR FRONTEND
const frontEnd = require("./frontEndRoutes");
router.use("/",frontEnd)

router.get("/showsessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;