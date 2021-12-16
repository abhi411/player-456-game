
module.exports = (app) => {
  const round = require("../controllers/round.controller.js");

  var router = require("express").Router();

  router.post("/changeround", round.changeCurrentRound)
  router.get("/getrounddetails", round.getRoundDetails)

  app.use("/api/round", router);
};
