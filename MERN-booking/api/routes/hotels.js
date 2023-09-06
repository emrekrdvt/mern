const router = require("express").Router();
const hotelController = require("../controller/hotelController");
const { verifyUser, verifyAdmin } = require("../utils/veriftToken");

//create
router.post("/", verifyAdmin, hotelController.addHotel);

//update
router.put("/:id", verifyAdmin, hotelController.updateHotel);

//delete
router.delete("/:id", verifyAdmin, hotelController.deleteHotel);

//get hotel
router.get("/:id", hotelController.getHotel);

//get all hotel
router.get("/", hotelController.getAllHotel);
module.exports = router;
