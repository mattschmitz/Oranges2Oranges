var models = require('./index.js');
var games = models.db.collection('gameinstancemodels');

module.exports.retrieveGameInstance = function(gameName) {
  return games.findOne({gameName: gameName});
};

module.exports.addPlayerToGameInstance = function(gameName, players, host) {
  if (host) {
    return games.update({gameName: gameName}, {$set: {players: players, host: host} });
  } else {
    return games.update({gameName: gameName}, {$set: {players: players} });
  }
};

module.exports.removePlayerFromGameInstance = function(gameName, players, player) {
  players.splice(players.indexOf(player));
  return games.update({gameName: gameName}, {$set: {players: players} });
}

module.exports.setGameInstanceGameStageToPlaying = function(gameName) {

  return games.update({gameName: gameName}, { $set: {gameStage: 'playing'} });
};

module.exports.updateRounds = function(gameName, roundsArray) {

  return games.update({gameName: gameName}, { $set: {rounds: roundsArray} });
};

module.exports.updateCurrentRound = function(gameName, round) {

  return games.update({gameName: gameName}, { $set: {currentRound: round} });
}

module.exports.setGameInstanceGameStageToGameOver = function(gameName) {

  return games.update({gameName: gameName}, { $set: {gameStage: 'gameover'} });
};

module.exports.deleteGameInstance = function(gameName) {

  return games.remove({gameName: gameName})
}