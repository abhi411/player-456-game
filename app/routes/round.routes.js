
module.exports = (app) => {
  const round = require("../controllers/round.controller.js");

  var router = require("express").Router();

  // Change round
  router.post("/changeround", round.changeCurrentRound)
  
  // Get current round details
  router.get("/getrounddetails", round.getRoundDetails)

  app.use("/api/round", router);
};
