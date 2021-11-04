const db = require("../models");
const Player = db.players;

// Create and Save a new Player
exports.create = (req, res) => {
  // Validate request
  if (!req.body.playerID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const { playerID, playerName, tokenID } = req.body;

  // Create a Player
  const player = new Player({
    playerID,
    playerName,
    tokenID
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

// Update a Player's score by the tokenID in the request
exports.updateScore = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const playerID = req.params.playerID;

  Player.findOne({ playerID })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Player with id=${playerID}. Maybe Player was not found!`
        });
      } else {
        data.score = req.body.score;
        data.save();
        res.send({ message: "Player was updated successfully. Score: " + req.body.score });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Player with id=" + playerID
      });
    });
};