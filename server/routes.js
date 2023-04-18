const express = require('express');
const {state, LIGHT} = require("./state")

const router = express.Router();



router.get('/', (req, res) => {

  res.json({
   message: "Hello from Preston's Heroku Server"
  })
  
});

router.post('/', (req, res) => {


 const newStatus = req.body.status;
 

if(newStatus === "true"){
  state.lightStatus = LIGHT.ON
}else{
  state.lightStatus = LIGHT.OFF
}
  
  res.send({lightOn: state.lightStatus})
});

module.exports = router;