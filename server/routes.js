const express = require('express');
const {state, LIGHT} = require("./state")

const router = express.Router();

router.get('/', (req, res) => {

  res.json({
   message: ""
  })
  
});

router.post('/', (req, res) => {
  // const newTodo = { name: req.body.name, completed: false };
  // todos.push(newTodo);

 const newStatus = req.body.status;
 console.log(req)

if(newStatus === "true"){
  state.lightStatus = LIGHT.ON
}else{
  state.lightStatus = LIGHT.OFF
}
  
  res.send({lightOn: state.lightStatus})
});

module.exports = router;