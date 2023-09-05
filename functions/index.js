const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

// eslint-disable-next-line max-len
// Assuming the service account key file is in the same directory as this index.js file
const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({origin: true}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Add other CORS headers if needed (e.g., methods, headers)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // eslint-disable-next-line max-len
  //   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// This route will send "Hello World" as a response to any incoming request
// app.use("/", (req, res, next) => {
//   res.send("Hello World");
//   next();
// });
const userRoute = require("./routes/userRouter");
app.use("/api/users", userRoute );

// Export the Express app as an HTTP Cloud Function
exports.app = functions.https.onRequest(app);


