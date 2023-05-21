// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

// mongoose.connect(process.env.MONGO_URL);
// const connection = mongoose.connection;

// connection.on("connected", () => {
//   // console.log("MongoDb connection is successful");
// });
// connection.on("error", (error) => {
//   // console.log("Error in MongoDb connection", error);
// });

// module.exports = mongoose;
// const mongoose = require("mongoose");
// const connectDB = () => {
//   const mongoUrl = process.env.MONGO_URL;
//   const connection = mongoose.createConnection(mongoUrl, {
//     minPoolSize: 50,
//   });
//   connection.on("open", () => {
//     console.log("MongoDB Connected!");
//   });
//   connection.on("error", (err) => {
//     console.error("Connection failed:", err);
//     process.exit(0);
//   });
//   return connection;
// };
// module.exports = { connectDB };
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

// const db = mongoose.connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }).then(async ()=>{

//         console.log("Database Connected");
//     }).catch(err=>{
//         console.log(err);
//         console.log("Error connecting database!!!.");
//     });

// module.exports = db;
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const conn = {
  test: {
    uri: process.env.MONGO_TEST_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  production: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

const env = process.env.NODE_ENV || "production";

let db;

if (env === "test") {
  db = mongoose
    .connect(conn.test.uri, conn[env].options)
    .then(async () => {
      console.log(`${env} Database Connected`);
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting database!!!.");
    });
} else {
  db = mongoose
    .connect(conn.production.uri, conn[env].options)
    .then(async () => {
      console.log(`${env} Database Connected`);
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting database!!!.");
    });
}

module.exports = db;
