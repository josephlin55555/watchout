// start slingin' some d3 here.
var gameOptions = {
  width: 800,
  height: 800,
  backgroundColor: 'black'
};

var enemyOption = {
  x : 400,
  y : 400,
  width : 30,
  height : 30,
  className: 'enemy'
};

var playerOption = {
  x : 400,
  y : 400,
  width : 30,
  height : 30,
  className: 'player'
};

var randomGenerator = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var svg = d3.select('body').append('svg');

svg
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)
  .style('background-color', gameOptions.backgroundColor);

var generateEnemies = function(n) {
  var enemies = [];
  for(var i = 0; i < n; i++) {
    var enemy = svg.append('svg:image');

    enemy
      .attr('xlink:href', 'images/cow.gif')
      .attr('x', enemyOption.x)
      .attr('y', enemyOption.y)
      .attr('width', enemyOption.width)
      .attr('height', enemyOption.height)
      .attr('class',enemyOption.className);

    enemies.push(enemy);
  }
  return enemies;
};

var generatePlayers = function(n){
  var players = [];
  for(var i = 0; i < n; i++) {
    var player = svg.append('svg:image');

    player
      .attr('xlink:href', 'images/player.gif')
      .attr('x', playerOption.x)
      .attr('y', playerOption.y)
      .attr('width', playerOption.width)
      .attr('height', playerOption.height)
      .attr('class',playerOption.className);

    players.push(player);
  }
  return players;
};


var setRandomPosition = function(enemy) {
  var x = randomGenerator(0, gameOptions.width);
  var y = randomGenerator(0, gameOptions.height);
  enemy.transition()
    .attr('x', x)
    .attr('y', y)
    .duration(2000);
};

//_.extend(enemy.prototype, ourMethod)

var enemies = generateEnemies(1);
var players =  generatePlayers(1);

var moveEnemies = function() {
  enemies.forEach(function(enemy) {
    setInterval(function(){
      setRandomPosition(enemy);
    }, 2000);
  });
};

moveEnemies();





