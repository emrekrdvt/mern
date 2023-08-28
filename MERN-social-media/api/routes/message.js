const router = require("express").Router();
const messageController = require("../controllers/messageController");

router.post("/", messageController.addMsg)
router.get("/:convId", messageController.getMsg)

module.exports = router;
