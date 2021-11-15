const auth = require('../middleware/auth')

module.exports = (app) => {
  const players = require("../controllers/player.controller.js");

  var router = require("express").Router();

  // Create a new Player
  router.post("/", auth.verifycreate,players.create);
  router.get("/token/create/", players.gettokencreate );

  // Retrieve all Players
  router.get("/", auth.verifyplayers, players.findAll);
  router.get("/token/players/", players.gettokenplayers );

  // Update a Player with id
  router.post("/:playerID", auth.verifyputplayer, players.updateScore);
  router.get("/token/putplayer/", players.gettokenuplayer );

  //Retrieve Player's Status
  router.get("/:playerID", auth.verifyplayer, players.hasPlayed);
  router.get("/token/player/", players.gettokenplayer);

  app.use("/api/players", router);
};
