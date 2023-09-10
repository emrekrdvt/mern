const router = require("express").Router();
const hotelController = require("../controller/hotelController");
const { verifyUser, verifyAdmin } = require("../utils/veriftToken");

//create
router.post("/", verifyAdmin, hotelController.addHotel);

//update
router.put("/:id", verifyAdmin, hotelController.updateHotel);

//delete
router.delete("/find/:id", verifyAdmin, hotelController.deleteHotel);

//get hotel
router.get("/find/:id", hotelController.getHotel);

//get all hotel
router.get("/", hotelController.getAllHotel);

router.get("/countByCity", hotelController.getCountCity);
router.get("/countByType", hotelController.getCountType);
router.get("/room/:id", hotelController.getHotelRooms);

module.exports = router;
