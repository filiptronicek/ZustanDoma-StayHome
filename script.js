let canvas = document.querySelector("#canvas"),
  ctx = canvas.getContext("2d"),
  blockSize = 30,
  width = 600,
  keys = [],
  pills = [],
  height = 600;

const board = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let player = {
  x: 8,
  y: 1,
};

let game = {
  timeElement: document.getElementById("time"),
  introduction: document.querySelector("#introduction"),
  scoreElement: document.getElementById("score"),
  endElement: document.getElementById("end"),
  endMessage: document.getElementById("message"),
  startButton: document.querySelector("#start"),
  score: 0,
  orgTime: 30,
  time: 0,
};

/*

  Preload the images

*/
let hero = new Image();
hero.src = "images/right.png";

let wall = new Image();
wall.src = "images/wall.png";

let pill1 = new Image();
pill1.src = "images/colls/face_mask.png";

let pill2 = new Image();
pill2.src = "images/colls/toilet_paper.png";

let pill3 = new Image();
pill3.src = "images/colls/lotion.png";

let pill4 = new Image();
pill4.src = "images/colls/pill2.png";

const pillsArray = [
  "lotion",
  "toilet_paper",
  "face_mask",
  "pill2"
];

canvas.width = width;
canvas.height = height;

function canMove(x, y) {
  return (
    y >= 0 &&
    y < board.length &&
    x >= 0 &&
    x < board[y].length &&
    board[y][x] != 1
  );
}

/*

  Changes the window that is currently displayed

*/

function changeWindow(name) {
  game.introduction.style = "none"; // úvod
  canvas.style.visibility = "hidden"; // hra

  if (name === "introduction") {
    game.introduction.style.display = "flex";
  } else if (name === "game") {
    canvas.style.visibility = "visible";
  }
}

function checkForExistingPoint(x, y) { }
function generateNewPoint(img) {
  function move() {
    const randomX = Math.floor(Math.random() * 20);
    const randomY = Math.floor(Math.random() * 20);
    if (canMove(randomX, randomY)) {
      ctx.drawImage(
        img,
        randomX * blockSize,
        randomY * blockSize,
        blockSize,
        blockSize
      );
      pills.push({
        x: randomX,
        y: randomY,
        imageObject: img
      });
    } else {
      move();
    }
  }
  move();
}
/*

  Iterates over the pillsArray array and call the generateNewPoint function

*/

function createPills() {
  pillsArray.forEach((img) => {
    let imgObj = new Image();
    imgObj.src = `/images/colls/${img}.png`;
    generateNewPoint(imgObj);
  });
}

/*

  Function generates the playing board

*/

function generateBoard() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 1) {
        ctx.drawImage(wall, x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }
}

function introduction() {
  changeWindow("introduction");
  game.startButton.addEventListener("click", startGame);
}

function startGame() {
  game.scoreElement.textContent = `${game.score}/${pillsArray.length}`;
  game.time = game.orgTime;
  console.log("creating pills")
  createPills();
  changeWindow("game");
  timer(game.time); //Initialization of the in-game timer for 30 seconds
  draw();
}

function endGame(type, timeTaken) {
  if (type === "win") {
    game.endElement.style.display = "block";
    game.endMessage.innerText = `You won! You have collected all the items in just ${game.orgTime - timeTaken[1]} seconds!`;
  }

  if (type === "loss") {
    game.endElement.style.display = "block";
    game.endMessage.innerText = `You lost. Good luck next time!`;
  }
}

// provádí pravidelný odpočet času
function timer(time) {
  function startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
    const CountDownInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      if (game.score === pillsArray.length) {
        clearInterval(CountDownInterval);
        endGame("win", [minutes, seconds]);
      }
      if (timer-- == 0) {
        clearInterval(CountDownInterval);
        endGame("loss", [minutes, seconds]);
      }

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.innerText = minutes + ":" + seconds;
      game.time = timer;
    }, 1000);
  }
  display = document.querySelector("#time");
  startTimer(time, display);
}

function movement() {
  if ((keys[39] || keys[68]) && canMove(player.x + 1, player.y)) {
    // šipka doprava
    hero.src = "images/right.png";
    player.x++;
  }

  if ((keys[37] || keys[65]) && canMove(player.x - 1, player.y)) {
    // šipka doleva
    hero.src = "images/left.png";
    player.x--;
  }

  if ((keys[38] || keys[87]) && canMove(player.x, player.y - 1)) {
    // šipka nahoru
    player.y--;
  }

  if ((keys[40] || keys[83]) && canMove(player.x, player.y + 1)) {
    // šipka dolů
    player.y++;
  }
}

function draw() {
  ctx.clearRect(
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize
  );

  generateBoard();
  movement();
  collect();

  ctx.drawImage(
    hero,
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize
  );
}

function collect() {
  for (let i = 0; i < pills.length; i++) {
    if (player.x == pills[i].x && player.y == pills[i].y) {
      pills.splice(i, 1);
      increaseScore();
    }
  }
}

function increaseScore() {
  game.score++;
  game.scoreElement.textContent = `${game.score}/${pillsArray.length}`;
}

/*

  Handle key pressing

*/

document.body.addEventListener("keydown", function (e) {
  if (game.endElement.style.display == "none") {
    keys[e.keyCode] = true;
    draw();
  }
});

document.body.addEventListener("keyup", function (e) {
  if (game.endElement.style.display == "none") {
    keys[e.keyCode] = false;
    draw();
  }
});

window.addEventListener("load", introduction);
