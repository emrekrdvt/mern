const router = require("express").Router();
const roomsController = require("../controller/roomsController");
const { verifyAdmin } = require("../utils/veriftToken");

//create
router.post("/:hotelid", verifyAdmin, roomsController.createRoom);

//update
router.put("/:id", verifyAdmin, roomsController.updateRoom);

router.put("/avlb/:id", roomsController.updateAvlb);

//delete
router.delete("/:id/:hotelid", verifyAdmin, roomsController.deleteRoom);

//get hotel
router.get("/:id", roomsController.getRoom);

//get all rooms
router.get("/", roomsController.getAllRoom);

module.exports = router;
