// On page load -> generate game board
window.onload = () => {
  console.log("Page Loaded");
  setRandomTileOrder(12);
  setTiles();
};

// Global variables
let i = 0;
let clicks;
let timeScore;

/* start button initiates game and starts counter
initiates game start on button press */
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);

const startGame = () => {
  tiles.forEach(tile => tile.addEventListener("click", displayTile));
  resetTiles();
  startButton.disabled = true;
  console.log(randomOrderArray);
  startTimer();
};

// End button stops the game
document.getElementById('endGame').addEventListener("click", endGame);

const endGame = () => {
  const endTimer = () => {
      timeScore = document.getElementById("timer").innerText;
      console.log(timeScore);
      clearInterval(timer);
  };
  randomOrderArray = [];
  startButton.innerText = "New Game";
  startButton.disabled = false;
  endTimer();
  calculateScore();
};

/* createRandom number function
creates random number which will later be assigned an icon
creates an array of 12 random numbers */
let randomOrderArray = [];
const setRandomTileOrder = (numberOfTiles) => {
  while (randomOrderArray.length < numberOfTiles) {
      let randomNum = Math.random() * (numberOfTiles - 1) + 1;
      randomNum = Math.round(randomNum);

      if (randomOrderArray.includes(randomNum)) {
          continue;
      } else {
          randomOrderArray.push(randomNum);
      }
  }
};

// Set tiles variable for use throughout code
const tiles = document.querySelectorAll(".gametile");

const setTiles = () => {
  for (const tile of tiles) {
      tile.innerHTML = randomOrderArray[i];
      i++;

      // Replace numerical values with icon pairs
      // Assuming variables like rocket, bacteria, cocktail, etc., hold the icon HTML
      if (tile.innerText < 3) {
          tile.innerHTML = rocket;
          tile.setAttribute("icon", "rocket");
      } else if (tile.innerHTML < 5) {
          tile.innerHTML = bacteria;
          tile.setAttribute("icon", "bacteria");
      } else if (tile.innerHTML < 7) {
          tile.innerHTML = cocktail;
          tile.setAttribute("icon", "cocktail");
      }
      //... similar conditions for other icons
  }
};

// Timer Function -> starts timer when the game is started and ends when the game is completed or canceled
let count;

const startTimer = () => {
  clearInterval(timer); // Clears timer before it starts. Fixes issues if the timer is triggered again when already running.
  count = 0;
  timer = setInterval(() => {
      count++;
      document.getElementById("timer").firstChild.innerText = count;

      // End timer when the timer reaches 60
      if (count === 60) {
          clearInterval(timer);
          document.getElementById("timer").firstChild.innerText = "Game Over";
      }
  }, 1000);
};

//... Remaining functions and variables rewritten in ES6 syntax
const football = `<i class="fas fa-football-ball"></i>`;
const mask = `<i class="fas fa-ufo"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const lightning = `<i class="far fa-bolt"></i>`;
const bulb = `<i class="fal fa-lightbulb"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;

let selectedTile = '';
let tileIcon;
const tileIcons = [];
const tileIds = [];

tiles.forEach(tile => tile.addEventListener("click", displayTile));
let n = 0;

const displayTile = (e) => {
    //reveal tile by changing bg color and changing font-size from 0 to 3em;
    e.target.classList.remove("hideTile");
    e.target.classList.add("displayTile");

    // logs the value of the tile's icon and Id
    tileIcon = e.target.getAttribute("icon");
    tileIcons.push(tileIcon);
    const tileId = e.target.getAttribute("id");
    tileIds.push(tileId);

    // this counts number of clicks
    countMoves();

    if (tileIcons.length % 2 === 0) {
        checkMatch(tileIcons, tileIds, n);
        n = n + 2;
    }
};

const checkMatch = (tileIcons, tileIds, n) => {
    console.log(n);
    console.log(n + 1);
    if (tileIcons[n] !== tileIcons[n + 1]) {
        console.log("no match");
        setTimeout(() => {
            document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
            document.getElementById(tileIds[n]).classList.remove("displayTile");
        }, 1000);
    } else {
        console.log("match");
        console.log(n);
        document.getElementById(tileIds[n]).style.backgroundColor = "green";
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
        document.getElementById(tileIds[n]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
    }
};

//let clicks;

const countMoves = () => {
    clicks = n;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
};

const clearTiles = () => {
    for (let n = 0; n < tiles.length; n++) {
        tiles[n].style.fontSize = "0em";
        tiles[n].style.backgroundColor = "#44445a";
    }
};

const calculateScore = () => {
    timeScore = parseInt(timeScore);
    const calculatedScore = timeScore + clicks;
    console.log(calculatedScore);
    document.querySelector("#score").firstChild.innerHTML = calculatedScore;
};

let newRGB;

const generateRGBVal = () => {
    const generateRandomColor = () => {
        let r = Math.random() * 255;
        r = Math.round(r);
        return r;
    };

    const rgbValue = [];
    for (let i = 0; i <= 2; i++) {
        const singleVal = generateRandomColor();
        rgbValue.push(singleVal);
    }
    newRGB = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
    return newRGB;
};

const resetTiles = () => {
    for (const tile of tiles) {
        tile.style.backgroundColor = "#44445a";
        tile.removeAttribute("state");
        tile.classList.remove("hideTile");
        tile.classList.remove("displayTile");
    }
};

