var random = [
  'The best thing to say to get out of jury duty is: ',
  'What is the best type of bear and why?',
  'If you had to name your child after a type of food, what would it be?',
  'What celebrity would you most like to run a farm with?',
  'If you ran a cheese shop it would be called: ',
  'The best fake name to use when checking into a hotel is: ',
  'A three-word sequel to Eat, Pray, Love: ',
  'A new Muppets movie: The Muppets Take _____',
  'What does Tri Tip even mean?'
]

var memes = [
  'memeOne',
  'memeTwo',
  'memeThree',
  'memeFour',
  'memeFive'
]

var allPrompts = {
  random: random, 
  memes: memes
}

var userAlreadySubmitted = function(username, responseArray) {
  var submitted = false;

  for (var i = 0; i < responseArray.length; i++) {
    if (responseArray[i][1] === username) {
      submitted = true;
    }
  }

  return submitted;
}

var addPrompts = function(gameInstance) {
  var Rounds = gameInstance.rounds.slice(0);
  var category = gameInstance.category
  var prompts = allPrompts[category].slice(0);
  var chosenPrompts = [];

  while (chosenPrompts.length < 4) {
    var randomIndex = Math.floor(Math.random() * prompts.length);
    var prompt = prompts[randomIndex];
    chosenPrompts.push(prompt);
    prompts.splice(randomIndex, 1);
  }

  Rounds.forEach(function(round, index) {
    Rounds[index].prompt = chosenPrompts[index];
  })

  gameInstance.rounds = Rounds;
}

module.exports.userAlreadySubmitted = userAlreadySubmitted;
module.exports.addPrompts = addPrompts;