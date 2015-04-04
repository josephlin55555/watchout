// start slingin' some d3 here.
var randomGenerator = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var gameOptions = {
  width: 800,
  height: 800,
  backgroundColor: 'black',
  currentScore: d3.select('.current').select('span'),
  highScore: d3.select('.high').select('span')
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

var generatePlayer = function(){
  var player = svg.append('svg:image');

  var drag = d3.behavior.drag() //what happens if there are two players?
    .on('drag', function(){
      player
        .attr('x', d3.event.x)
        .attr('y',d3.event.y);
  });


  player
    .attr('xlink:href', 'images/player.gif')
    .attr('x', playerOption.x)
    .attr('y', playerOption.y)

    .attr('width', playerOption.width)
    .attr('height', playerOption.height)
    .attr('class',playerOption.className)
    .call(drag);

  return player;
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

var enemies = generateEnemies(30);
var player =  generatePlayer();

var moveEnemies = function() {
  enemies.forEach(function(enemy) {
    setInterval(function(){
      setRandomPosition(enemy);
    }, 2000);
  });
};

moveEnemies();

var collisionDetection = function() {
  var d = 10;

  for(var i = 0; i < enemies.length; i++) {
    var y_player = Number(player.attr('y')) + d;
    var x_player = Number(player.attr('x')) + d;
    var enemy = enemies[i];
    var x_enemy = Number(enemy.attr('x')) + d;
    var y_enemy = Number(enemy.attr('y')) + d;

    var x_diff = Math.abs(x_enemy - x_player);
    var y_diff = Math.abs(y_enemy - y_player);
    if(x_diff < 30 && y_diff < 30) {
      return true;
    }
  }
  return false;
};

var enableCollisionDetection = function() {
  var currentScoreN = 0;
  var highScoreN = 0;
  setInterval(function() {
    if(collisionDetection()){
      if(currentScoreN > highScoreN) {
        highScoreN = currentScoreN;
        gameOptions.highScore.text(highScoreN);
      }
      currentScoreN = 0;
      gameOptions.currentScore.text(currentScoreN);
    } else {
      currentScoreN++;
      gameOptions.currentScore.text(currentScoreN);
    }
  }, 5);
};

enableCollisionDetection();














