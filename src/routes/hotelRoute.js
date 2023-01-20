const express = require("express");
const hotelController = require("../controller/hotelController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/register",authMiddleware, hotelController.register);
router.get("/view-all", hotelController.viewAll);
module.exports = router;