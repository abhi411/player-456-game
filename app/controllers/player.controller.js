const db = require("../models");
const Player = db.players;

// Create and Save a new Player
exports.create = (req, res) => {
  // Validate request
  if (!req.body.playerID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Player
  const player = new Player({
    playerID: req.body.playerID,
    playerName: req.body.playerName,
    tokenID: req.body.tokenID
  });

  // Save Player in the database
  player
    .save(player)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Player."
      });
    });
};

// Retrieve all Players from the database.
exports.findAll = (req, res) => {
  Player.find({})
    .then(data => {
      res.json({
        total: data.length,
        players: data
      });
    })
    .catch(err => {
      res.status(500).send({  
        message:
          err.message || "Some error occurred while retrieving players."
      });
    });
};