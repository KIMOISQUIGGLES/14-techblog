const express = require("express");
const router = express.Router();
const {
    Comment,
    Blog
} = require("../models");


// FIND ALL BLOGS 
router.get("/", (req, res) => {
    Blog.findAll({include: [Comment]})
        .then(dbBlogs => {
            res.json(dbBlogs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: "ERROR",
                err
            });
        });
});
// FIND SINGLE BLOG
router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id, {})
        .then(dbBlog => {
            res.json(dbBlog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: "ERROR",
                err
            });
        });
});

// CREATE A BLOG
router.post("/", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            msg: "MUST LOGIN!"
        })
    }
    Blog.create({
            title: req.body.title,
            body: req.body.body,
            UserId: req.session.user.id
        })
        .then(newBlog => {
            res.json(newBlog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: "ERROR",
                err
            });
        });
});

// UPDATE A BLOG
router.put("/:id", (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    Blog.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(updatedBlog => {
            console.log(updatedBlog);
            res.json(updatedBlog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: "ERROR ",
                err
            });
        });
});

// DELETE A BLOG
router.delete("/:id", (req, res) => {
    Blog.destroy({
            where: {
                id: req.params.id
            }
        }).then(delBlog => {
            res.json(delBlog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: "ERROR",
                err
            });
        });
});

module.exports = router;