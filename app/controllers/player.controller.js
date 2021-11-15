const db = require("../models");
const config = require("../config/db.config");
const Player = db.players;
const jwt = require('jsonwebtoken')

//get token
exports.gettokencreate = ( req,res ) => {
  // Create token
  ip = req.ip
  ip = ip.slice(ip.lastIndexOf(":")+1)
  key = req.baseUrl
  key = req.headers.origin || "invalid" // Get Domain
  console.log(key)
  const token = jwt.sign(
    { method: "create" },
    key,
    {
      expiresIn: "2h",
    }
  );
  res.send(token)
}
exports.gettokenuplayer = ( req,res ) => {
  // Create token
  ip = req.ip
  ip = ip.slice(ip.lastIndexOf(":")+1)
  key = req.baseUrl
  key = req.headers.origin || "invalid" // Get Domain
  const token = jwt.sign(
    { method: "putplayer" },
    key,
    {
      expiresIn: "2h",
    }
  );
  res.send(token)
}
exports.gettokenplayers = ( req,res ) => {
  // Create token
  ip = req.ip
  ip = ip.slice(ip.lastIndexOf(":")+1)
  key = req.baseUrl
  key = req.headers.origin || "invalid" // Get Domain

  const token = jwt.sign(
    { method: "players" },
    key,
    {
      expiresIn: "2h",
    }
  );
  res.send(token)
}
exports.gettokenplayer = ( req,res ) => {
  // Create token
  ip = req.ip
  ip = ip.slice(ip.lastIndexOf(":")+1)
  key = req.baseUrl
  key = req.headers.origin || "invalid" // Get Domain

  const token = jwt.sign(
    { method: "player" },
    key,
    {
      expiresIn: "2h",
    }
  );
  res.send(token)
}
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
    tokenID,
  });

  // Save Player in the database
  player
    .save(player)
    .then((data) => {

      

      // send data
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Player.",
      });
    });
};

// Retrieve all Players from the database.
exports.findAll = (req, res) => {
  Player.find({})
    .then((data) => {
      res.json({
        total: data.length,
        players: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving players.",
      });
    });
};

// Update a Player's score by the tokenID in the request
exports.updateScore = (req, res, ) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const playerID = req.params.playerID;

  Player.findOne({ playerID })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Player with id=${playerID}. Maybe Player was not found!`,
        });
      } else {
        data.score = req.body.score;
        data.hasPlayed = req.body.hasPlayed;
        data.save();
        res.send({
          message: "Player was updated successfully. Score: " + req.body.score,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Player with id=" + playerID,
      });
    });
};

// Get a Player's hasPlayed Status by the tokenID in the request
exports.hasPlayed = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to be retrieved can not be empty!",
    });
  }

  const playerID = req.params.playerID;

  Player.findOne({ playerID })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Player with id=${playerID}. Maybe Player was not found!`,
        });
      } else {
        res.json({
          id: playerID,
          hasPlayed: data.hasPlayed,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error Gettting Player with id=" + playerID,
      });
    });
};
