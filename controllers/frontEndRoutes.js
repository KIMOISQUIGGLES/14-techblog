const { response } = require('express');
const express = require('express');
const router = express.Router();
const {User,Blog, Comment} = require('../models');

router.get("/",(req,res)=>{
    res.render("login")
})

router.get("/home",(req,res)=>{
    Blog.findAll({include:[Comment]}).then(blogs=>{
        // console.log(blogs)
        const hbsBlogs = blogs.map(blog=>blog.get({plain:true}))
        console.log("==========")
        // console.log(hbsBlogs)
        const loggedIn = req.session.user?true:false
        res.render("home",{blogs:hbsBlogs,loggedIn,username:req.session.user?.username})
    })
})



router.get("/post/:id",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    Blog.findByPk(req.params.id,{include:[Comment]}).then(commentBlog=>{
       console.log(commentBlog);
        const post = commentBlog.get({plain:true})
        console.log("============================")
        console.log(post)
        const loggedIn = req.session.user?true:false
        res.render("comment",{post: post, loggedIn})
    })
})

router.get("/login",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/")
    }
    res.render("home")
})

router.get("/dashboard", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/")
    }
    Blog.findAll({
        where: {
            userId: req.session.userId
        }
    }).then(dbPostData => {
        const blogs = dbPostData.map((post) => post.get({plain: true}));

        res.render("dashboard",blogs)
    }).catch(err => {
        console.log(err);
        res.redirect("login");
    });
})

module.exports = router;