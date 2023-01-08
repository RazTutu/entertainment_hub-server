const Games = require('../models/gamesModel');

exports.addGame = (req, res) => {
  const game = req.body;
  console.log('game is', game);
  if(req.isAuthenticated()){
    Games.create(game).then(data => {
      res.json({"message created": data});
    })
    .catch(err => {
      res.json(err)
    })
    console.log('the user is authenticated');
  } else {
    console.log('the user is not authenticated');
    res.status(500).send("Not authenticated");
  }

};