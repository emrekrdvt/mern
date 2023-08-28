const router = require("express").Router();
const postController = require("../controllers/postController");

//create Post
router.post("/", postController.createPost);
//update Post
router.put("/:id", postController.updatePost);
// delete Post
router.delete("/:id", postController.deletePost);
//like a  Post
router.put("/:id/like", postController.likePost);

//get a post
router.get("/:id", postController.getPost);
// get timeline posts
router.get("/all/timeline/:userId", postController.getTimeLinePost);

router.get("/profile/:username", postController.getUsernamePosts);

module.exports = router;
