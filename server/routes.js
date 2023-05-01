const express = require("express");
const { state, Light } = require("./state");
const router = express.Router();

router.get("/", async (req, res) => {


  res.json({
    message: state.lightStatus,
  });
});

router.post("/", (req, res) => {
  const newStatus = req.body.status;

  
  if (newStatus === true) {
    state.lightStatus = Light.On;
  } else {
    state.lightStatus = Light.Off;
  }

  res.send({ lightOn: state.lightStatus });
});

module.exports = router;
