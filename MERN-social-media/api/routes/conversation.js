const router = require("express").Router();
const conversationController = require("../controllers/conversationController");

router.post("/", conversationController.newConv);
router.get("/:userId", conversationController.getConv);
router.get(
  "/find/:firstUserId/:secondUserId",
  conversationController.getConv2userId
);

module.exports = router;
