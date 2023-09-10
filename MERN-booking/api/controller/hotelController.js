const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
exports.addHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};
exports.updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};
exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has ben deleted");
  } catch (error) {
    next(error);
  }
};
exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

exports.getAllHotel = async (req, res, next) => {
  const { min, max, limit, featured } = req.query;
  try {
    const hotel = await Hotel.find({
      featured,
      cheapestPrice: { $gte: min || 1, $lte: max || 999 },
    }).limit(limit);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};
exports.getCountCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

exports.getCountType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartCount = await Hotel.countDocuments({ type: "apart" });
    const obaCount = await Hotel.countDocuments({ type: "oba" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apart", count: apartCount },
      { type: "oba", count: obaCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }

};

exports.getHotelRooms = async (req,res,next) =>{
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
}