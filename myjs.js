class LudoSnakeGame {
    constructor(grid_size = 10, players = 2, numSnakes = 5, numLaders = 5) {
        this.gridSize = grid_size;
        this.grid = new Array(grid_size);

        this.snakesNumber = parseInt(numSnakes);

        // snakes 2d array store (start number, end number) in one 
        this.snakesList = new Array(this.snakesNumber);

        this.ladersNumber = parseInt(numLaders);

        // ladders 2d array store (start number, end number) in one 
        this.ladersList = new Array(this.ladersNumber);

        // Declaring 2D array for grid
        for (let i = 0; i < grid_size; i++) {
            this.grid[i] = new Array(grid_size);
        }

        // Initializing Grid  
        let counter = 1;
        for (let i = 0; i < grid_size; i++) {
            for (let j = 0; j < grid_size; j++) {
                this.grid[i][j] = counter;
                counter += 1;
            }
        }

        // Initializing Snakes  
        for (let i = 0; i < this.snakesNumber; i++) {
            var random_number = parseInt((Math.random() * 80)) + 15;

            // checking in loop so that same values should not occur
            while (this.snakesList.includes(random_number)) {
                random_number = parseInt((Math.random() * 75)) + 15;
            }
            this.snakesList[i] = random_number;
        }

        // Initializing Ladders  
        for (let i = 0; i < this.ladersNumber; i++) {
            var random_number = parseInt((Math.random() * 75)) + 10;

            // checking in loop so that same values of snakes and laders should not occur
            while (this.snakesList.includes(random_number)) {
                random_number = parseInt((Math.random() * 75)) + 10;
            }

            // checking in loop so that same values should not occur
            while (this.ladersList.includes(random_number)) {
                random_number = parseInt((Math.random() * 75)) + 10;
            }


            this.ladersList[i] = random_number;
        }

        // console.log(this.snakesList);
        // console.log(this.ladersList);

        this.total_players = players;
    }

    getLadersSize() {
        return this.ladersNumber;
    }

    getLadersList() {
        return this.ladersList;
    }

    getSnakesSize() {
        return this.snakesNumber;
    }

    getSnakesList() {
        return this.snakesList;
    }

    getGrid() {
        return this.grid;
    }

    getGridSize() {
        return this.gridSize;
    }

}

// It randomly generate a new value for ladder and snakes
function getRandomValue(currVal, mode) {
    var value = null;
    if (mode == "snake") {
        value = parseInt(Math.random() * (currVal - 1));
        if (value < 0) {
            value = 0;
        }
    } else if (mode == "lader") {
        value = currVal + parseInt(Math.random() * 15);
        if (value > 100) {
            value = 100;
        }
    }

    return value;
}

// checks either snake or lader exist on the number
function findValue(value, myarr) {

    if (value > 0 && myarr.length > 0) {
        for (let i = 0; i < myarr.length; i++) {
            if (value == myarr[i]) {
                return true;
            }
        }
    }

    return false;
}

function displayTable() {

}

function changeTableScores() {

}

function loadGame(flag = true) {
    var game_level = parseInt(localStorage.getItem("game_level"));
    var totalPlayers = localStorage.getItem("Players");
    localStorage.setItem("players_completed", 0);

    ludoGame = null;

    if (game_level == 1) {
        snakes = 2;
        laders = 6;
        ludoGame = new LudoSnakeGame(10, totalPlayers, snakes, laders);
    } else if (game_level == 2) {
        snakes = 4;
        laders = 6;
        ludoGame = new LudoSnakeGame(10, totalPlayers, snakes, laders);
    } else if (game_level == 3) {
        snakes = 5;
        laders = 5;
        ludoGame = new LudoSnakeGame(10, totalPlayers, snakes, laders);
    } else if (game_level == 4) {
        snakes = 6;
        laders = 3;
        ludoGame = new LudoSnakeGame(10, totalPlayers, snakes, laders);
    }

    if (flag == false) {
        // remove the elements from the div of ID grid
        var element = document.getElementById("grid");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    displayGrid()

    const playerColors = ["purple", "crimson", "teal", "saddlebrown"];

    // it stores players table element
    var ele = document.getElementById("players-table-body");

    // it stores players information div in a modal
    var modalPlayersEle = document.getElementById("players-information");

    var playersArr = new Array(totalPlayers);

    localStorage.setItem("CurrentPlayer", 1);
    localStorage.setItem("players_completed", 0);
    for (let i = 0; i < totalPlayers; i++) {

        playersArr[i] = localStorage.getItem("P" + (i + 1));

        // In the beginning all things are set to 0
        localStorage.setItem("P" + (i + 1) + "_score", 0);
        localStorage.setItem("P" + (i + 1) + "_snakes", 0);
        localStorage.setItem("P" + (i + 1) + "_laders", 0);
        localStorage.setItem("P" + (i + 1) + "_attempt", 0);
        localStorage.setItem("position_" + (i + 1), totalPlayers);

        if (flag == true) {
            // code for creating table for players information
            // It creates sub elements of a table and fill the information
            const trEle = document.createElement("tr");
            trEle.setAttribute("id", "player_" + (i + 1) + "_info")
            trEle.style.backgroundColor = playerColors[i];
            trEle.style.color = "white";

            const tdEle1 = document.createElement("td");
            tdEle1.setAttribute("id", "player_" + (i + 1) + "_name")
            const tdEle2 = document.createElement("td");
            tdEle2.setAttribute("id", "player_" + (i + 1) + "_score")
            const tdEle3 = document.createElement("td");
            tdEle3.setAttribute("id", "player_" + (i + 1) + "_snakes")
            const tdEle4 = document.createElement("td");
            tdEle4.setAttribute("id", "player_" + (i + 1) + "_laders")
            const tdEle5 = document.createElement("td");
            tdEle5.setAttribute("id", "player_" + (i + 1) + "_attempts")

            const tdText1 = document.createTextNode(localStorage.getItem("P" + (i + 1)).toUpperCase());
            const tdText2 = document.createTextNode(localStorage.getItem("P" + (i + 1) + "_score"));
            const tdText3 = document.createTextNode(localStorage.getItem("P" + (i + 1) + "_snakes"));
            const tdText4 = document.createTextNode(localStorage.getItem("P" + (i + 1) + "_laders"));
            const tdText5 = document.createTextNode(localStorage.getItem("P" + (i + 1) + "_attempt"));

            tdEle1.appendChild(tdText1);
            tdEle2.appendChild(tdText2);
            tdEle3.appendChild(tdText3);
            tdEle4.appendChild(tdText4);
            tdEle5.appendChild(tdText5);

            trEle.appendChild(tdEle1);
            trEle.appendChild(tdEle2);
            trEle.appendChild(tdEle3);
            trEle.appendChild(tdEle4);
            trEle.appendChild(tdEle5);

            ele.appendChild(trEle);

            // creating elements/tags for player information in modal
            // const inputEle = document.createElement("input")
            // inputEle.setAttribute("id", "player_name_P" + (i + 1));
            // inputEle.setAttribute("disabled", "true");
            // inputEle.value = localStorage.getItem("P" + (i + 1)).toUpperCase();

            // modalPlayersEle.appendChild(inputEle);
        }

    }

    if (flag == false) {
        for (let i = 1; i <= totalPlayers; i++) {
            document.getElementById("player_" + i + "_score").innerText = "0";
            document.getElementById("player_" + i + "_snakes").innerText = parseInt(localStorage.getItem("P" + (i) + "_snakes"));
            document.getElementById("player_" + i + "_laders").innerText = parseInt(localStorage.getItem("P" + (i) + "_laders"));
            document.getElementById("player_" + i + "_attempts").innerText = parseInt(localStorage.getItem("P" + (i) + "_attempt"));
        }
    }
}

function displayGrid(currValue = -1) {
    var element = document.getElementById("grid");
    var gameGrid = ludoGame.getGrid();
    var gameGridSize = ludoGame.getGridSize();
    var gameSnakes = ludoGame.getSnakesList();
    var gameLaders = ludoGame.getLadersList();

    var players_scores = new Array(ludoGame.total_players);

    for (let i = 0; i < ludoGame.total_players; i++) {
        players_scores[i] = localStorage.getItem("P" + (i + 1) + "_score");
    }

    const playerColors = ["purple", "crimson", "teal", "saddlebrown"];

    for (let row_counter = 0; row_counter < gameGridSize; row_counter++) {
        const divEle = document.createElement("div");
        divEle.classList.add("row");
        const rowEle = document.createElement("ul");

        for (let col_counter = 0; col_counter < gameGridSize; col_counter++) {
            const colEle = document.createElement("li");
            const text = document.createTextNode(gameGrid[row_counter][col_counter]);
            colEle.setAttribute('id', "col_" + gameGrid[row_counter][col_counter]);

            // assign red color to snakes
            // green color for laders
            if (findValue(gameGrid[row_counter][col_counter], gameSnakes) == true) {
                colEle.style.backgroundColor = "Red";
            } else if (findValue(gameGrid[row_counter][col_counter], gameLaders) == true) {
                colEle.style.backgroundColor = "Green";
            }

            var flag = false;
            for (let i = 0; i < ludoGame.total_players; i++) {
                // if (flag == true) {
                //     colEle.style.backgroundColor = "black";
                //     colEle.style.borderRadius = "30px";
                // }

                // else 
                if (players_scores[i] == gameGrid[row_counter][col_counter]) {
                    colEle.style.backgroundColor = playerColors[i];
                    colEle.style.borderRadius = "30px";
                    // flag = true;
                }

                else if (currValue == gameGrid[row_counter][col_counter]) {
                    colEle.style.backgroundColor = "blue";
                    colEle.style.borderRadius = "15px";
                    console.log("executed");
                }
            }

            colEle.appendChild(text);
            rowEle.appendChild(colEle);
        }

        divEle.appendChild(rowEle);
        element.appendChild(divEle);
    }
}

function toggleDice() {
    var diceBtn = document.getElementById("roll-dice-btn");
    diceBtn.style.display = diceBtn.style.display == '' ? "none" : "";
}

function rollDice() {
    toggleDice();

    document.getElementById("dice").style.animation = "rotation 1s 1 linear";

    var ele = document.getElementById("dice-value");
    diceValue = parseInt(Math.random() * 6);
    ele.textContent = diceValue + 1;
    movePlayer(diceValue + 1);
}

function changeCurrentPlayer(currPlayer, totalPlayer) {
    return parseInt((currPlayer % totalPlayer)) + 1;
}

function removeOldGrid(currValue = -1) {
    // remove the elements from the div of ID grid
    var element = document.getElementById("grid");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    displayGrid(currValue);
}

function moveTokens(valOne, valTwo) {
    if (valOne == valTwo) {
        return;
    }
    // for (let i = parseInt(valOne) + 1; i < parseInt(valTwo); i++) {
    //     setTimeout(removeOldGrid(i), 100);
    // }

    moveTokens(valOne + 1, valTwo);
}

function movePlayer(dice_value) {
    currPlayer = localStorage.getItem("CurrentPlayer");

    // changing player turn 
    nextPlayer = changeCurrentPlayer(currPlayer, ludoGame.total_players);
    localStorage.setItem("CurrentPlayer", nextPlayer);

    // it will check if player's score is 100 then it will pass the turn to next player
    var counter = 0;
    while (parseInt(localStorage.getItem("P" + (currPlayer) + "_score")) >= 100) {
        currPlayer = nextPlayer;
        nextPlayer = changeCurrentPlayer(currPlayer, ludoGame.total_players);
        localStorage.setItem("CurrentPlayer", nextPlayer);
        counter += 1;

        if (counter > ludoGame.total_players) {
            checkGameOver();
            return;
        }
    }

    const currentPlayer = currPlayer;
    // incrementing player attempts
    localStorage.setItem("P" + (currPlayer) + "_attempt", parseInt(localStorage.getItem("P" + (currPlayer) + "_attempt")) + 1);

    // get current score from the local storage
    currPlayerScore = parseInt(localStorage.getItem("P" + (currPlayer) + "_score"));
    new_score = currPlayerScore + dice_value;

    // // apply the logic here
    // setTimeout(() => {
    //     for (let i = currPlayerScore; i <= new_score; i++) {
    //         localStorage.setItem("P" + (currPlayer) + "_score", i);
    //     }
    // }, )

    // moveTokens(currentPlayer, new_score);

    // check player's score in the list of snakes and 
    let moveStatus = -1;
    while (findValue(new_score, ludoGame.getSnakesList()) == true || findValue(new_score, ludoGame.getLadersList()) == true) {
        if (findValue(new_score, ludoGame.getSnakesList())) {
            new_val = getRandomValue(new_score, "snake");
            setTimeout(showSnake("Alas! " + localStorage.getItem("P" + currPlayer).toUpperCase() + " you are bitten by a snake you are moved back from " + new_score + " to " + new_val), 2000);
            new_score = new_val;
            localStorage.setItem("P" + (currPlayer) + "_snakes", parseInt(localStorage.getItem("P" + (currPlayer) + "_snakes")) + 1);
        }

        else if (findValue(new_score, ludoGame.getLadersList())) {
            new_val = getRandomValue(new_score, "lader");
            setTimeout(showLader("Wow! " + localStorage.getItem("P" + currPlayer).toUpperCase() + " you climbed a ladder moved up from " + new_score + " to " + new_val), 2000);
            new_score = new_val;
            localStorage.setItem("P" + (currPlayer) + "_laders", parseInt(localStorage.getItem("P" + (currPlayer) + "_laders")) + 1);
        }
    }

    // update scores
    if (new_score >= 100) {
        new_score = 100;
        localStorage.setItem("players_completed", parseInt(localStorage.getItem("players_completed")) + 1)
        localStorage.setItem("position_" + currPlayer, parseInt(localStorage.getItem("players_completed")));

        showWinning(localStorage.getItem("P" + currentPlayer), parseInt(localStorage.getItem("position_" + currPlayer)));

        localStorage.setItem("P" + (currPlayer) + "_score", new_score);
        if (parseInt(localStorage.getItem("players_completed")) == ludoGame.total_players - 1) {
            checkGameOver();
        }

    }

    else {
        localStorage.setItem("P" + (currPlayer) + "_score", new_score);
    }

    document.getElementById("player_" + currPlayer + "_score").innerText = new_score;
    document.getElementById("player_" + currPlayer + "_snakes").innerText = parseInt(localStorage.getItem("P" + (currPlayer) + "_snakes"));
    document.getElementById("player_" + currPlayer + "_laders").innerText = parseInt(localStorage.getItem("P" + (currPlayer) + "_laders"));
    document.getElementById("player_" + currPlayer + "_attempts").innerText = parseInt(localStorage.getItem("P" + (currPlayer) + "_attempt"));

    // remove the elements from the div of ID grid
    // var element = document.getElementById("grid");
    // while (element.firstChild) {
    //     element.removeChild(element.firstChild);
    // }

    // displayGrid();

    setTimeout(toggleDice, 1000);

    setTimeout(() => {
        document.getElementById("dice").style.animation = "";
    }, 1000);

    setTimeout(removeOldGrid, 1200);
}

function showSnake(msg) {
    document.getElementById('game-display').style.opacity = '0.15';
    document.getElementById('goback-btn').style.display = 'none';
    document.getElementsByClassName('dice-btn')[0].style.display = 'none';
    var msgEle = document.getElementById("message");
    msgEle.style.display = "block";
    msgEle.innerText = msg;

    const elem = document.getElementById("snake-gifs");
    elem.style.display = "block";
    let id = null;
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 2);
    function frame() {
        if (pos == 1400) {
            elem.style.left = '0px';
            document.getElementById('game-display').style.opacity = '1';
            document.getElementById('goback-btn').style.display = 'flex';
            document.getElementsByClassName('dice-btn')[0].style.display = 'flex';
            msgEle.style.display = "none";
            elem.style.display = "none";
            clearInterval(id);
        } else {
            pos++;
            elem.style.left = pos + 'px';
        }
    }

}

function showLader(msg) {
    document.getElementById('game-display').style.opacity = '0.15';
    document.getElementById('goback-btn').style.display = 'none';
    document.getElementsByClassName('dice-btn')[0].style.display = 'none';
    const elem = document.getElementById("lader-gifs");
    elem.style.display = "block";
    var msgEle = document.getElementById("message");
    msgEle.style.display = "block";
    msgEle.innerText = msg;

    let id = null;
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 2);
    function frame() {
        if (pos == 800) {
            elem.style.left = '0px';
            elem.style.bottom = '0px';
            document.getElementById('game-display').style.opacity = '1';
            document.getElementById('goback-btn').style.display = 'flex';
            document.getElementsByClassName('dice-btn')[0].style.display = 'flex';
            elem.style.display = "none";
            msgEle.style.display = "none";

            clearInterval(id);
        } else {
            pos++;
            elem.style.left = pos + 'px';
            elem.style.bottom = pos + 'px';
        }
    }
}

function showWinning(name, position) {
    alert("Congratulations! " + name + " got : " + position);
}

function checkGameOver() {
    var elem = document.getElementById("game-display");
    elem.style.display = "none";
    var elem = document.getElementById("game_over");
    elem.style.display = "block";

    const tableEle = document.getElementById("result-table-body");
    const playerColors = ["purple", "crimson", "teal", "saddlebrown"];
    for (let i = 0; i < ludoGame.total_players; i++) {
        const trEle = document.createElement("tr");
        trEle.style.backgroundColor = playerColors[i];
        trEle.style.color = "white";

        const tdEle1 = document.createElement("td");
        const tdEle2 = document.createElement("td");
        const tdEle3 = document.createElement("td");
        const tdEle4 = document.createElement("td");
        const tdEle5 = document.createElement("td");
        const tdEle6 = document.createElement("td");

        const tdText1 = document.createTextNode(localStorage.getItem("P" + (i + 1)).toUpperCase());
        const tdText2 = document.createTextNode(localStorage.getItem("P" + (i + 1) + "_score"));
        const tdText3 = document.createTextNode(localStorage.getItem("P" + (i + 1) + "_snakes"));
        const tdText4 = document.createTextNode(localStorage.getItem("P" + (i + 1) + "_laders"));
        const tdText5 = document.createTextNode(localStorage.getItem("P" + (i + 1) + "_attempt"));
        const tdText6 = document.createTextNode(localStorage.getItem("position_" + (i + 1)));

        tdEle1.appendChild(tdText1);
        tdEle2.appendChild(tdText2);
        tdEle3.appendChild(tdText3);
        tdEle4.appendChild(tdText4);
        tdEle5.appendChild(tdText5);
        tdEle6.appendChild(tdText6);

        trEle.appendChild(tdEle1);
        trEle.appendChild(tdEle2);
        trEle.appendChild(tdEle3);
        trEle.appendChild(tdEle4);
        trEle.appendChild(tdEle5);
        trEle.appendChild(tdEle6);

        tableEle.appendChild(trEle);
    }
}

