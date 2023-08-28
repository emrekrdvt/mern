// users transactions
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
//update

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const user = await User.findById(req.params.id);
        if (!req.body.username) req.body.username = user.username;
        if (!req.body.email) req.body.email = user.email;
        if (!req.body.password) req.body.password = user.password;
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(updatedUser);
      } catch (err) {
        return res.status(500).json(err);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update onlu your account");
  }
});

//delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findOneAndDelete(req.params.id);
        return res.status(200).json("User has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("You can delete onlu your account");
  }
});

//Get user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    if (!user) res.status(400).json("User not found");
    res.status(200).json(others);
  } catch (err) {}
});

module.exports = router;
