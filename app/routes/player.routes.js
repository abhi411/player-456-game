module.exports = (app) => {
  const players = require("../controllers/player.controller.js");

  var router = require("express").Router();

  // Create a new Player
  router.post("/", players.create);

  // Retrieve all Players
  router.get("/", players.findAll);

  // Update a Player with id
  router.post("/:playerID", players.updateScore);

  //Retrieve Player's Status
  router.get("/:playerID", players.hasPlayed);

  app.use("/api/players", router);
};
