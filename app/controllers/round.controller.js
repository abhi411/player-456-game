const fs = require('fs')


//get token
exports.changeCurrentRound = (req, res) => {
    // Checking necessary request parameters
    if (typeof req.body.currentRound != 'undefined' && req.body.currentRound != "" && req.body.secret == "FenAv(3yU;g;qFd<") {
        try {
            var rounds = fs.readFileSync(__basedir + "roundDetails.json", { encoding: 'utf8' });
        } catch (e) {
            res.send("Something went wrong, please contact administrator.")
        }
        rounds = JSON.parse(rounds)
        rounds = rounds.rounds
        //Finding the round as per provided game id/round number
        let givenRoundInd = rounds.findIndex((elem) => elem.id == req.body.currentRound)
         // Updating round details based on user request
        let updatedRoundDetails = []
        rounds.map((elem) => { elem.currentGame = false; updatedRoundDetails.push(elem) })
        rounds[givenRoundInd].title = (typeof req.body.title != 'undefined' && req.body.title != "") ? req.body.title : rounds[givenRoundInd].title
        rounds[givenRoundInd].description = (typeof req.body.description != 'undefined' && req.body.description != "") ? req.body.description : rounds[givenRoundInd].description
        updatedRoundDetails[givenRoundInd].currentGame = true
        updatedRoundDetails = { rounds: updatedRoundDetails }
        // Saving  round details in a file
        try {
            fs.writeFileSync(__basedir + "roundDetails.json", JSON.stringify(updatedRoundDetails))
            res.send("Request is processed successfully!")
        } catch (e) {
            console.log("errp ", e)
            res.send("Something went wrong, please contact administrator.")
        }
    }
    else {
        res.send("Invalid Request!")
    }

}


//get current round details
exports.getRoundDetails = (req, res) => {
    // Reading round details from the file
    try {
        var rounds = fs.readFileSync(__basedir + "roundDetails.json", { encoding: 'utf8' });
    } catch (e) {
        res.send("Something went wrong, please contact administrator.")
        return
    }
    // Returning current round details to user
    rounds = JSON.parse(rounds)
    var roundDetails = rounds.rounds.filter((elem) => elem.currentGame == true)
    res.send(roundDetails[0])
}