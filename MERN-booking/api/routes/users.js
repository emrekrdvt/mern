const router = require("express").Router();
const userController = require("../controller/userController");
const { verifyUser, verifyAdmin } = require("../utils/veriftToken");

//update
router.put("/:id", verifyUser, userController.updateUser);

//delete
router.delete("/:id", verifyUser, userController.deleteUser);

//get hotel
router.get("/:id", verifyUser, userController.getUser);

//get all hotel
router.get("/", verifyAdmin, userController.getAllUser);

module.exports = router;
