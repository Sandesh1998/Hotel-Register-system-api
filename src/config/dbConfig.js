const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDb connection is successful");
});
connection.on("error", (error) => {
  console.log("Error in MongoDb connection", error);
});

module.exports = mongoose;
