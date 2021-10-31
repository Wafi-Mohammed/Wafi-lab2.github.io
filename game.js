function Bear() {
  this.dBear = 100;
  this.htmlElement = document.getElementById("bear");
  this.id = this.htmlElement.id;
  this.x = this.htmlElement.offsetLeft;
  this.y = this.htmlElement.offsetTop;

  this.move = function (xDir, yDir) {
    this.fitBounds();
    this.x += this.dBear * xDir;
    this.y += this.dBear * yDir;
    this.display();
  };

  this.display = function () {
    this.htmlElement.style.left = this.x + "px";
    this.htmlElement.style.top = this.y + "px";
    this.htmlElement.style.display = "block";
  };

  this.fitBounds = function () {
    let parent = this.htmlElement.parentElement;
    let iw = this.htmlElement.offsetWidth;
    let ih = this.htmlElement.offsetHeight;
    let l = parent.offsetLeft;
    let t = parent.offsetTop;
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;
    if (this.x < 0) this.x = 0;
    if (this.x > w - iw) this.x = w - iw;
    if (this.y < 0) this.y = 0;
    if (this.y > h - ih) this.y = h - ih;
  };
}

function start() {
  bear = new Bear();

  document.addEventListener("keydown", moveBear, false);

  bees = new Array();
  makeBees();
  updateBees();
  lastStingTime = new Date();
}

function moveBear(e) {
  const KEYUP = 38;
  const KEYDOWN = 40;
  const KEYLEFT = 37;
  const KEYRIGHT = 39;

  if (e.keyCode == KEYRIGHT) {
    bear.move(1, 0);
  }

  if (e.keyCode == KEYLEFT) {
    bear.move(-1, 0);
  }

  if (e.keyCode == KEYUP) {
    bear.move(0, -1);
  }

  if (e.keyCode == KEYDOWN) {
    bear.move(0, 1);
  }
}

class Bee {
  constructor(beeNumber) {
    this.htmlElement = createBeeImg(beeNumber);
    this.id = this.htmlElement.id;
    this.x = this.htmlElement.offsetLeft;
    this.y = this.htmlElement.offsetTop;

    this.move = function (dx, dy) {
      this.x += dx;
      this.y += dy;
      this.display();
    };

    this.display = function () {
      this.fitBounds();
      this.htmlElement.style.left = this.x + "px";
      this.htmlElement.style.top = this.y + "px";
      this.htmlElement.style.display = "block";
    };

    this.fitBounds = function () {
      let parent = this.htmlElement.parentElement;
      let iw = this.htmlElement.offsetWidth;
      let ih = this.htmlElement.offsetHeight;
      let l = parent.offsetLeft;
      let t = parent.offsetTop;
      let w = parent.offsetWidth;
      let h = parent.offsetHeight;

      if (this.x < 0) this.x = 0;
      if (this.x > w - iw) this.x = w - iw;
      if (this.y < 0) this.y = 0;
      if (this.y > h - ih) this.y = h - ih;
    };
  }
}

function createBeeImg(wNum) {
  let boardDiv = document.getElementById("board");
  let boardDivW = boardDiv.offsetWidth;
  let boardDivH = boardDiv.offsetHeight;
  let boardDivX = boardDiv.offsetLeft;
  let boardDivY = boardDiv.offsetTop;
  let img = document.createElement("img");

  img.setAttribute("src", "images/bee.gif");
  img.setAttribute("width", "100");
  img.setAttribute("alt", "A bee!");
  img.setAttribute("id", "bee" + wNum);
  img.setAttribute("class", "bee");
  img.style.position = "absolute";

  boardDiv.appendChild(img);
  let x = getRandomInt(boardDivW);
  let y = getRandomInt(boardDivH);

  img.style.left = boardDivX + x + "px";
  img.style.top = boardDivY + y + "px";

  return img;
}

function getRandomInt(max) {
  var random = Math.floor(Math.random() * max);
  return random;
}

function makeBees() {
  let nbBees = document.getElementById("nbBees").value;
  nbBees = Number(nbBees);

  if (isNaN(nbBees)) {
    window.alert("Invalid number of bees");
    return;
  }

  let i = 1;
  while (i <= nbBees) {
    var num = i;
    var bee = new Bee(num);
    bee.display();
    bees.push(bee);
    i++;
  }
}

function moveBees() {
  let speed = document.getElementById("speedBees").value;
  speed = Number(speed);
  for (let i = 0; i < bees.length; i++) {
    let dx = getRandomInt(2 * speed) - speed;
    let dy = getRandomInt(2 * speed) - speed;
    bees[i].move(dx, dy);
    isHit(bees[i], bear);
  }
}

function updateBees() {
  moveBees();
  let period = document.getElementById("periodTimer").value;
  updateTimer = setTimeout("updateBees()", period);
}

function isHit(defender, offender) {
  if (overlap(defender, offender)) {
    let score = hits.innerHTML;
    score = Number(score) + 1;
    hits.innerHTML = score;

    let newStingTime = new Date();
    let thisDuration = newStingTime - lastStingTime;
    lastStingTime = newStingTime;
    let longestDuration = Number(duration.innerHTML);
    if (longestDuration === 0) {
      longestDuration = thisDuration;
    } else {
      if (longestDuration < thisDuration) longestDuration = thisDuration;
    }
    document.getElementById("duration").innerHTML = longestDuration;
  }
}

function overlap(element1, element2) {
  left1 = element1.htmlElement.offsetLeft;
  top1 = element1.htmlElement.offsetTop;
  right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
  bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;

  left2 = element2.htmlElement.offsetLeft;
  top2 = element2.htmlElement.offsetTop;
  right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
  bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;

  x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
  y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
  intersectArea = x_intersect * y_intersect;

  if (intersectArea == 0 || isNaN(intersectArea)) {
    return false;
  }
  return true;
}
