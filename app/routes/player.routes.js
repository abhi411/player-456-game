module.exports = app => {
  const players = require("../controllers/player.controller.js");

  var router = require("express").Router();

  // Create a new Player
  router.post("/", players.create);

  // Retrieve all Players
  router.get("/", players.findAll);

  // Update a Player with id
  router.put("/:playerID", players.updateScore);

  app.use("/api/players", router);
};
