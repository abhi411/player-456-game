const fs = require('fs')


//get token
exports.changeCurrentRound = ( req,res ) => {
    if(typeof req.body.currentRound != 'undefined' && req.body.currentRound != ""){
  
    }
    res.send(token)
  }


//get token
exports.getRoundDetails = ( req,res ) => {
  var rounds= fs.readFileSync(__basedir + "roundDetails.json",  {encoding:'utf8'});
  rounds = JSON.parse(rounds)
  var roundDetails = rounds.rounds.filter((elem) => elem.currentGame == true) 
  res.send(roundDetails[0])
}