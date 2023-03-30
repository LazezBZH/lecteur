function randomNumber(min, max) {
  number = Math.floor(Math.random() * (max - min) + min);
  return number;
}

//starting values
var one, two, three, four, five, six, seven;
one = 40;
two = 35;
three = 25;
four = 35;
five = 45;
six = 17;
seven = 50;

// change the height of column randomly
function changeHeight(column, height) {
  height -= randomNumber(-20, 20);
  if (height > 50) height = 50;
  if (height < 2) height = 2;
  column.style.height = height + "px";
  return height;
}

//if player is playing changeHeight will be called every 50ms for each bar
function animate() {
  if (isPlaying) {
    one = changeHeight(document.getElementById("one"), one);
    two = changeHeight(document.getElementById("two"), two);
    three = changeHeight(document.getElementById("three"), three);
    four = changeHeight(document.getElementById("four"), four);
    five = changeHeight(document.getElementById("five"), five);
    six = changeHeight(document.getElementById("six"), six);
    seven = changeHeight(document.getElementById("seven"), seven);

    setTimeout(animate, 50);
  }
}
