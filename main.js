let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (playerScore < 5 && computerScore < 5) {
            playRound(e.target.dataset.move);
        }
    });
});

const moveSelectedDiv = document.querySelector("#move-selected");
const roundResultDiv = document.querySelector("#round-result");
const scoreDiv = document.querySelector("#score");
const overallResultDiv = document.querySelector("#overall-result");
const newGameDiv = document.querySelector("#new-game");

const newGameButton = document.createElement("button");
newGameButton.id = "new-game-button";
newGameButton.textContent = "New Game";
newGameButton.addEventListener("click", resetGame);

function computerPlay() {
    switch (Math.floor(Math.random() * 3)) {
        case 0: return "Rock";
        case 1: return "Paper";
        case 2: return "Scissors";
    }
}

function determineResult(playerSelection, computerSelection) {
    let standardizedPlayerSelection = capitalizeFirstChar(playerSelection);
    if (standardizedPlayerSelection === computerSelection) {
        return "Draw";
    } else {
        let isPlayerWin;

        switch (standardizedPlayerSelection) {
            case "Rock": {
                if (computerSelection === "Scissors") isPlayerWin = true;
                else isPlayerWin = false;
                break;
            }
            case "Paper": {
                if (computerSelection === "Rock") isPlayerWin = true;
                else isPlayerWin = false;
                break;
            }
            case "Scissors": {
                if (computerSelection === "Paper") isPlayerWin = true;
                else isPlayerWin = false;
                break;
            }
            default: return;
        }

        if (isPlayerWin) {
            return "Win";
        } else {
            return "Lose";
        }
    }
}

function playRound(playerSelection) {
    let computerSelection = computerPlay();
    let result = determineResult(playerSelection, computerSelection);

    switch (result) {
        case "Draw": {
            moveSelectedDiv.textContent = `Player selected ${playerSelection}, Computer selected ${computerSelection}`;
            roundResultDiv.textContent = "Draw!";
            break;
        }

        case "Win": {
            playerScore++;
            moveSelectedDiv.textContent = `Player selected ${playerSelection}, Computer selected ${computerSelection}`;
            roundResultDiv.textContent =  `You Win! ${playerSelection} beats ${computerSelection}`;
            break;
        }

        case "Lose": {
            computerScore++;
            moveSelectedDiv.textContent = `Player selected ${playerSelection}, Computer selected ${computerSelection}`;
            roundResultDiv.textContent = `You Lose! ${computerSelection} beats ${playerSelection}`;
            break;
        }

        default: {
            roundResultDiv.textContent = "Player input is not a valid move"; 
            i--; 
            break;
        }
    }
    
    scoreDiv.textContent = `Player: ${playerScore}, Computer: ${computerScore}`;

    if (playerScore >= 5) {
        overallResultDiv.textContent = "You Win!";
        newGameDiv.appendChild(newGameButton);
    } else if (computerScore >= 5) {
        overallResultDiv.textContent = "Computer Wins!";
        newGameDiv.appendChild(newGameButton);
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    moveSelectedDiv.textContent = "";
    roundResultDiv.textContent = "";
    scoreDiv.textContent = "";
    overallResultDiv.textContent = "";
    newGameDiv.removeChild(this);
}

function capitalizeFirstChar(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
}