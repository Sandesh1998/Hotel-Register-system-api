const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/dbConfig");
const userRoute = require("./src/routes/userRoute");
const hotelRoute = require("./src/routes/hotelRoute");
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/hotel", hotelRoute);
const port = process.env.Port || 5000;
if (process.env.NODE.ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };
