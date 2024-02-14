var selectedlevelsarray = [600, 400, 200, 100, 20];
const n = 20;
const m = 20;
const arrayrightgameover = generateGameOverArray(1, n, m, 1);
const arrayleftgameover = generateGameOverArray(0, n, m, 0);

function generateGameOverArray(start, n, m, temp) {
  const array = [];
  for (var i = start; temp == 1 ? i <= n : i < n; i++) {
    if (temp == 1) {
      array.push(i * m + 1);
    } else if (temp == 0) {
      array.push(i * m);
    }
  }
  return array;
}

const arrayContainer = document.getElementById("array-container");
var num = 1;
var popnum;
var randomnum;

for (let i = 1; i <= n; i++) {
  const row = document.createElement("div");
  row.classList.add("array-row");

  for (let j = 1; j <= m; j++) {
    const cell = document.createElement("div");
    cell.classList.add("array-cell");
    row.appendChild(cell);
    cell.innerHTML = `<div class="value">${num}</div>`;
    num = num + 1;
  }

  arrayContainer.appendChild(row);
}
var selectElement = document.querySelector("select");
var previousValue = selectElement.value;

selectElement.addEventListener("change", function (e) {
  if (previousValue !== selectElement.value) {
    console.log("Selected value: " + selectElement.value);
    previousValue = selectElement.value;
    
    startgame(selectedlevelsarray[previousValue - 1]);
  }
});

function startgame(intervaltime) {
  var score = 0;
  const Snake = [1];

  var temp1 = parseInt(((n / 2) * m) / 2);

  const randomnumarray = [temp1];
  render(Snake, randomnumarray[0]);

  function render(Snake, ramum) {
    const arrayrow = document.getElementsByClassName("array-row");
    const arrayRowArray = Array.from(arrayrow);

    arrayRowArray.forEach((rowElement, rowIndex) => {
      const cellElements = rowElement.getElementsByClassName("array-cell");
      const cellArray = Array.from(cellElements);

      cellArray.forEach((cellElement, cellIndex) => {
        const valueElement = cellElement.querySelector(".value");
        if (Snake.includes(parseInt(valueElement.innerText))) {
          if (Snake[0] == parseInt(valueElement.innerText)) {
            cellElement.style.backgroundColor = "Grey";
          } else {
            cellElement.style.backgroundColor = "Yellow";
          }
        } else if (parseInt(valueElement.innerText) === ramum) {
          cellElement.style.backgroundColor = "Green";
        } else {
          cellElement.style.backgroundColor = "rgb(30, 26, 26)";
        }
      });
    });
  }

  function getRandomInt(min, max, exclude) {
    let randomNum;

    do {
      randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (exclude.includes(randomNum));

    return randomNum;
  }

  function randomgeneration(Snake) {
    const excludedNumbers = Snake;
    const randomNum = getRandomInt(1, n * m, excludedNumbers);
    return randomNum;
  }

  function eatingfood(Snake, popnum, randomnumarray) {
    if (Snake[0] == randomnumarray[0]) {
      Snake.push(popnum);
      randomnumarray.unshift(randomgeneration(Snake));
      score++;

      var score1 = document.getElementsByClassName("score1");
      score1[0].textContent = String(score);

      randomnumarray.pop();
      render(Snake, randomnumarray[0]);
    } else {
      render(Snake, randomnumarray[0]);
    }
  }

  let intervalId;
  let gameover = false;
  const Snakearray = new Array();
  
  document.addEventListener("keydown", function (event) {
  

    event.preventDefault();
   
   
    if (gameover) {
      return;
    }
    clearInterval(intervalId);

    switch (event.key) {
      case "ArrowDown":
        intervalId = setInterval(() => {
          popnum = Snake[Snake.length - 1];
          Snake.unshift(Snake[0] + m);
          for (var i = 0; i < Snake.length - 1; i++) {
            Snakearray[i] = Snake[i + 1];
          }
          if (Snake[0] / n >= n || Snakearray.includes(Snake[0])) {
            stopGame();
            
          } else {
            Snake.pop();
            eatingfood(Snake, popnum, randomnumarray);
          }
        }, intervaltime);
        break;
      case "ArrowUp":
        intervalId = setInterval(() => {
          popnum = Snake[Snake.length - 1];
          Snake.unshift(Snake[0] - m);
          for (var i = 0; i < Snake.length - 1; i++) {
            Snakearray[i] = Snake[i + 1];
          }
          if (Snake[0] <= 0 || Snakearray.includes(Snake[0])) {
            stopGame();
            
          } else {
            Snake.pop();
            eatingfood(Snake, popnum, randomnumarray);
          }
        }, intervaltime);
        break;
      case "ArrowLeft":
        intervalId = setInterval(() => {
          popnum = Snake[Snake.length - 1];
          Snake.unshift(Snake[0] - 1);
          for (var i = 0; i < Snake.length - 1; i++) {
            Snakearray[i] = Snake[i + 1];
          }
          if (
            arrayleftgameover.includes(Snake[0]) ||
            Snakearray.includes(Snake[0])
          ) {
            stopGame();
           
          } else {
            Snake.pop();
            eatingfood(Snake, popnum, randomnumarray);
          }
        }, intervaltime);
        break;
      case "ArrowRight":
        intervalId = setInterval(() => {
          popnum = Snake[Snake.length - 1];
          Snake.unshift(Snake[0] + 1);
          for (var i = 0; i < Snake.length - 1; i++) {
            Snakearray[i] = Snake[i + 1];
          }
          if (
            arrayrightgameover.includes(Snake[0]) ||
            Snakearray.includes(Snake[0])
          ) {
            stopGame();
           
          } else {
            Snake.pop();
            eatingfood(Snake, popnum, randomnumarray);
          }
        }, intervaltime);
        break;
      default:
        break;
    }
  });

  function stopGame() {
    clearInterval(intervalId);
    gameover = true;
   
    const result = confirm("Game Over....? Select Different Level");
    if (result) {
      score = 0;
      var score1 = document.getElementsByClassName("score1");
      score1[0].textContent = String(score);
    } else {
      startgame(intervaltime);
    }
  }
}

// // Start the game
// startgame(intervaltime);
