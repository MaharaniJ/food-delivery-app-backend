/* eslint-disable new-cap */
const router = require("express").Router();
const admin = require("firebase-admin");
router.get("/", (req, res) => {
  return res.json("Inside userRoute");
});

router.get("/jwtVerfication", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).json({message: "Token not found"});
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res.status(400).json({message: "Invalid token"});
    }
    return res.status(200).json({message: true, data: decodedValue});
  } catch (error) {
    return res.send({
      status: 200,
      message: error.message,
    });
  }
});
module.exports = router;


