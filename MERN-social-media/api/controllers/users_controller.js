const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res) => {
  console.log(req.body)
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json("ERROR");
      }
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json("Updated");
    } catch (error) {
      return res.status(401).json("ERROR");
    }
  } else {
    return res.status(401).json("You can update only your account");
  }
};

exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.deleteOne({ _id: req.params.id });
      return res.status(200).json("Deleted");
    } catch (error) {
      return res.status(500).json("ERROR", error);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
};

exports.getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    if (!user) return res.status(404).json("User not found");

    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.followUser = async (req, res) => {
  
  if (req.body.userId !== req.params.id) {
    try {
      const followingUserId = req.params.id;
      const currentUserId = req.body.userId;
      const followingUser = await User.findById(followingUserId);
      const currentUser = await User.findById(currentUserId);
      console.log(`curent user ${currentUser}     followingsuser ${followingUser}`)
      if (!followingUser.followers.includes(currentUserId)) {
        await followingUser.updateOne({
          $push: { followers: currentUserId },
        });
        await currentUser.updateOne({
          $push: { followings: followingUserId },
        });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (error) {
      res.status(500).json(`User not found ${error}`);
    }
  } else {
    res.status(403).json("U cant follow yourself");
  }
};

exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const followingUserId = req.params.id;
      const currentUserId = req.body.userId;
      const followingUser = await User.findById(followingUserId);
      const currentUser = await User.findById(currentUserId);
      if (followingUser.followers.includes(currentUserId)) {
        await followingUser.updateOne({
          $pull: { followers: currentUserId },
        });
        await currentUser.updateOne({
          $pull: { followings: followingUserId },
        });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("You already unfollow this user");
      }
    } catch (error) {
      res.status(500).json(`User not found ${error}`);
    }
  } else {
    res.status(403).json("U cant unfollow yourself");
  }
};

exports.getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePic } = friend;
      friendList.push({ _id, username, profilePic });
    });
    res.status(200).json(friendList)
  } catch (error) {
    res.status(200).json(error);
  }
};
