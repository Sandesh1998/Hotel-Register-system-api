const Hotel = require("../models/hotelModel");

class hotelController {
  register = async (req, res) => {
    const { name, address, phoneNumber, website } = req.body;
    try {
      const hotel = await Hotel.findOne({ name: name });
      if (hotel) {
        res.status(200).send({ message: "Hotel already exists" });
        return;
      }
      const _hotel = {
        name,
        address,
        phoneNumber,
        website,
      };
      const newHotel = new Hotel(req.body);
      const data = await newHotel.save();
      if (data) {
        res.status(200).send({ message: "Hotel registered sucessfully", data });
      } else {
        console.log("Hotel");
      }
    } catch (error) {
      res.status(500).send({
        message: "Error registering hotel",
        success: false,
        error: error.message,
      });
    }
  };
  viewAll = async (req, res) => {
    try {
      const hotel = await Hotel.find();
      if (!hotel) {
        res.status(200).send({ message: "No Hotel Exists" });
        return;
      }
      res
        .status(200)
        .send({ message: "Below are the hotels", success: true, hotel });
    } catch (error) {
      res.status(500).send({
        message: "Error geeting hotel",
        success: false,
        error: error.message,
      });
    }
  };
}

module.exports = new hotelController();
