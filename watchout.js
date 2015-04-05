// start slingin' some d3 here.
var randomGenerator = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var gameOptions = {
  width: 800,
  height: 800,
  duration: 2000,
  numOfEnemy: 10,
  backgroundColor: 'black'
};

var currentScore = 0;
var highScore = 0;
var collisions = 0;

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

var generateEnemies = function() {

  var enemies = svg.selectAll(enemyOption.className)
    .data(d3.range(0, gameOptions.numOfEnemy))
    .enter()
    .append('svg:image')
    .attr('xlink:href', 'images/cow.gif')
    .attr('x', enemyOption.x)
    .attr('y', enemyOption.y)
    .attr('width', enemyOption.width)
    .attr('height', enemyOption.height)
    .attr('class',enemyOption.className);

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

var enemies = generateEnemies();
var player =  generatePlayer();

var moveEnemies = function(enemy) {

  enemy.transition()
    .attr('x', randomGenerator(0, gameOptions.width))
    .attr('y', randomGenerator(0, gameOptions.width))
    .duration(gameOptions.duration)
    .each('end', function() {
      moveEnemies(d3.select(this));
    });
};

moveEnemies(enemies);

var collisionDetection = function() {
  var d = 10;
  var y_player = Number(player.attr('y')) + d;
  var x_player = Number(player.attr('x')) + d;

  for(var i = 0; i < enemies[0].length; i++) {
    var enemy = d3.select(enemies[0][i]);
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

  if(collisionDetection()){
    highScore = currentScore > highScore ? currentScore : highScore;
    currentScore = 0;
    collisions++;
  }
};

setInterval(function() {
  currentScore++;
  d3.select('.current span').text(currentScore);
  d3.select('.high span').text(highScore);
  d3.select('.collisions span').text(collisions);
}, 100);

d3.timer(enableCollisionDetection);














