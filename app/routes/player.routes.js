module.exports = app => {
  const players = require("../controllers/player.controller.js");

  var router = require("express").Router();

  // Create a new Player
  router.post("/", players.create);

  // Retrieve all Players
  router.get("/", players.findAll);

  app.use("/api/players", router);
};
