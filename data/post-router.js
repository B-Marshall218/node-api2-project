const express = require("express");
const router = express.Router();
const Posts = require("./db.js");

router.get("/", (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error);
            res.status(500), json({ message: "error retrieving posts" })
        })
})

router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The post information could not be retrieved",
            })
        })
})

router.get("/:id/comments", (req, res) => {
    const id = req.params.id
    // const commentInfo = { ...req.body, postId: req.params.id }

    const comments = Posts.findCommentById(id)
        // Posts.findCommentById(commentInfo)
        .then(comment => {
            if (comment) {
                res.status(201).json(comment)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: ("The comments information could not be retrieved.", err) })
        })
})

router.post("/", (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            if (post) {
                res.status(201).json(post)
            } else {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post" })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database", err })
        })
})


router.post("/:id/comments", (req, res) => {
    const commentsInfo = { ...req.body, post_id: req.params.id }
    Posts.insertComment(commentsInfo)
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the comment to the database", err })
        })
})

router.delete("/:id", (req, res) => {
    Posts.remove(req.params.id)
        .then(post => {
            if (post > 0) {
                res.status(200).json({ message: "Delete successful" })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
})


router.put("/:id", (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post" })
            }
            // else {
            //     res.status(404).json({ messaage: "The post with the specified ID does not exist" })
            // }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post information could not be modified" })
        })
})


module.exports = router;