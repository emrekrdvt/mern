const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const users_Controller = require("../controllers/users_controller");

router.put("/:id", users_Controller.updateUser);
//delete user

router.delete("/:id", users_Controller.deleteUser);

//get a user
router.get("/", users_Controller.getUser);

//get all user
router.get("/alluser", users_Controller.getAllUser);

//follow user
router.put("/:id/follow", users_Controller.followUser);

// unfollow user
router.put("/:id/unfollow", users_Controller.unfollowUser);

//get friends
router.get("/friends/:userId", users_Controller.getMyFriends);

module.exports = router;
