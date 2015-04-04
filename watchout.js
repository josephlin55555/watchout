// start slingin' some d3 here.
var gameOptions = {
  width: 500,
  height: 500,
  backgroundColor: 'black'
};

var circleOption = {
  cx : 250,
  cy : 250,
  r : 10,
  fill : 'white'
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
    var circle = svg.append('circle');

    circle
      .attr('cx', circleOption.cx)
      .attr('cy',circleOption.cy)
      .attr('r', circleOption.r)
      .style('fill', circleOption.fill);

    enemies.push(circle);
  }
  return enemies;
};

var setRandomPosition = function(circle) {
  var cx = randomGenerator(0, 500);
  var cy = randomGenerator(0, 500);
  circle.transition()
    .attr('cx', cx)
    .attr('cy', cy)
    .duration(2000);
};

//_.extend(circle.prototype, ourMethod)

var enemies = generateEnemies(1);

var moveEnemies = function() {
  enemies.forEach(function(enemy) {
    setInterval(function(){
      setRandomPosition(enemy);
    }, 2000);
  });
};

moveEnemies();





