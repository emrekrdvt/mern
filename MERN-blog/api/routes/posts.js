// users transactions
const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// create post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
     res.status(500).json(error);
  }
});

//update post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(updatedPost);
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(401).json("You can only update your own post");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//delte
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === await req.body.username) {
      try {
        await post.deleteOne();
        return res.status(200).json("post has been deleted");
      } catch (error) {
        return res.status(500).json(`BU GELDİ ${error} `);
      }
    } else {
      return res.status(401).json("You can only delete your own post");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});


//Get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(err);
  }
})


router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get all posts

module.exports = router;
