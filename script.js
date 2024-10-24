(function tictactoe() {
  const gameboard = [];
  let rounds;
  // minimum amount of rounds 5 is needed to check if there's a winner
  let currentGo = false;
  const marker = ["X", "O"];
  const playerNames = { player1: "player1", player2: "player2" };
  const container = document.querySelector(".container");
  let isPlaying = false;
  let currentWinner;
  const playbtn = document.querySelector(".play");
  const [player1, player2] = [
    document.querySelector(".player1"),
    document.querySelector(".player2"),
  ];

  function editNames() {
    function enterName(e) {
      e.preventDefault();

      const previousMessage = e.target.innerText;
      const message = "Enter your name";
      const name = prompt(message);
      if (name) {
        e.target.innerText = name;
        playerNames[e.target.classList[1]] = name;
        console.log(playerNames);
        if (isPlaying) {
          currentTurn();
        }
      } else {
        e.target.innerText = previousMessage;
      }
    }
    player1.addEventListener("click", enterName);
    player2.addEventListener("click", enterName);
  }

  function currentTurn() {
    if (!currentGo) {
      document.querySelector(".turn").innerText = `It's ${
        playerNames.player1
      }'s turn ${marker[Number(currentGo)]}`;
    } else {
      document.querySelector(".turn").innerText = `It's ${
        playerNames.player2
      }'s turn ${marker[Number(currentGo)]}`;
    }
  }

  function enterMarker(sign, row, rowPos, e) {
    if (e.target.innerText != "") {
      alert("Square isn't empty choose another one");
      return;
    }
    rounds--;
    console.log(rounds);
    gameboard[row][rowPos] = sign;
    e.target.innerText = sign;
    console.log(gameboard);
    checkWinner(marker[Number(currentGo)], row, rowPos);
    // debugger;
    if (!rounds && !currentWinner) {
      console.log("rondss");
      document.querySelector(".turn").innerText = "Draw";
      isPlaying = false;
    }
    if (isPlaying) {
      currentGo = !currentGo;
      currentTurn();
    }

    // const current = JSON.parse(JSON.stringify(gameboard.slice()));
    // console.log({ current });
    // console.log(document.querySelector(`.square[pos="${rowPrompt},${rowPos}"]`).innerText = marker);
  }

  function generateGrid() {
    gameboard.length = 0;

    container.innerText = "";
    // const turn = document.createElement("div");
    // turn.classList.add("turn");
    const grid = document.createElement("div");
    grid.classList.add("grid");
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let index = 0; index < 3; index++) {
        row.push("_");
        const div = document.createElement("div");
        div.style.height = `${900 / 3}px`;
        div.style.width = `${900 / 3}px`;
        div.style.backgroundColor = "white";
        div.setAttribute("pos", `${i},${index}`);
        div.style.border = "1px solid black";
        div.classList.add("square");
        div.addEventListener("click", function (e) {
          if (!isPlaying) {
            return;
          }

          enterMarker(marker[Number(currentGo)], i, index, e);
        });
        grid.appendChild(div);
      }
      gameboard.push(row);
    }
    container.insertAdjacentElement("afterbegin", grid);
  }

       function DisplayWinner(triple,symbol) {
        
        if (!triple) {
          isPlaying = false;
          if (document.querySelector(".turn")) {
            console.log("if statement");
            document.querySelector(".turn").innerText = `${
              symbol === "X" ? playerNames.player1 : playerNames.player2
              } is the winner`;
            }
            currentWinner = true;
          }
        }

  function checkWinner(symbol, currentRow, rowPos) {
    function checkRow() {
      let triple = 3;
      for (let index = 0; index < 3; index++) {
        if (gameboard[currentRow][index] !== symbol) {
          triple = 3;
          break;
        }
        if (gameboard[currentRow][index] == symbol) {
          triple--;
        }
      }

      DisplayWinner(triple,symbol)
    }

    function checkColumn() {
      //   debugger
      let triple = 3;
      for (let index = 0; index < 3; index++) {
        if (gameboard[index][rowPos] !== symbol) {
          triple = 3;
          break;
        }
        if (gameboard[index][rowPos] == symbol) {
          triple--;
        }
      }

      DisplayWinner(triple,symbol)

    }
    function checkDiagonal1() {
      let triple = 3;
      for (let index = 0; index < 3; index++) {
        if (gameboard[index][index] !== symbol) {
          triple = 3;
          break;
        }
        if (gameboard[index][index] == symbol) {
          triple--;
        }
      }

      DisplayWinner(triple,symbol)

    }
    function checkDiagonal2() {
      let triple = 3;
      for (let index = 0; index < 3; index++) {
        if (gameboard[index][3 - (1 + index)] !== symbol) {
          triple = 3;
          break;
        }
        if (gameboard[index][3 - (1 + index)] == symbol) {
          triple--;
        }
      }

      DisplayWinner(triple,symbol)
    }

   

    checkRow();

    if (isPlaying) {
      checkColumn();
      console.log("toast");
    }
    if (isPlaying) {
      checkDiagonal1();
      console.log("toast");
    }
    if (isPlaying) {
      checkDiagonal2();
      console.log("toast");
    }
  }
  function whoGoesfirst() {
    const rand = Math.random();
    console.log(rand);
    if (rand <= 0.5) {
      currentGo = false;
    } else {
      currentGo = true;
    }
  }

  playbtn.addEventListener("click", function (e) {
    // debugger
    e.preventDefault();
    // debugger
    if (!playerNames.player1 || !playerNames.player2) {
      alert("Enter a name for both players using the buttons");
    } else {
      isPlaying = true;
      currentWinner = false;
      rounds = 9;
      generateGrid();
      whoGoesfirst();
      currentTurn();
    }
  });

  editNames();
})();
