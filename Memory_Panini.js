var Memory = {};
class Player {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}
class leaderboardEntry {
    constructor(game, guesses, cards) {
        this.game = game;
        this.guesses = guesses;
        this.cards = cards;
        this.score = parseInt(cards * 20 + cards * cards * 10 / (guesses + 1));
    }
}
feedingMemoryWithFoundationalInformation();
//***************************** SETUP ********************************
function feedingMemoryWithFoundationalInformation() {
    if (localStorage.leaderboardArray == undefined) {
        localStorage.leaderboardArray = "[]";
    }
    Memory.leaderboardArray = JSON.parse(localStorage.leaderboardArray);

    Memory.numOfCards = 12;
    Memory.boardContainer = document.getElementById('play-board-container');
    Memory.isFirstOfRound = true;
    Memory.cardsGuessed = 0;
    Memory.guessesCounter = 0;
    Memory.leaderboard = document.getElementById('leaderboard');
    Memory.frontOfLastCard = Memory.cardBack;
    Memory.frontOfCurrentCard = Memory.cardBack;
    Memory.allPhotos = [
        './Gallery/Neuer.png',
        './Gallery/Hummels.png',
        './Gallery/Hector.png',
        './Gallery/Rudy.png',
        './Gallery/Boateng.png',
        './Gallery/Ruediger.png',
        './Gallery/Kimmich.png',
        './Gallery/Kroos.png',
        './Gallery/Khedira.png',
        './Gallery/Can.png',
        './Gallery/Goretzka.png',
        './Gallery/Oezil.png',
        './Gallery/Goetze.png',
        './Gallery/Mueller.png',
        './Gallery/Draxler.png',
        './Gallery/Sane.png',
        './Gallery/Brandt.png',
        './Gallery/Werner.png',
    ]
    Memory.startButton = document.getElementById('start-button');
    Memory.startButton.addEventListener('click', initializeGame);
    Memory.newGameButtonsArr = document.getElementsByClassName('new-game-option');
    Memory.newGameButtonsArr[0].addEventListener('click', showNewGameField);
    Memory.newGameButtonsArr[1].addEventListener('click', showNewGameField);
    Memory.winningMessage = document.getElementById('winning-message');
    Memory.LeaderBoardButtonsArr = document.getElementsByClassName('leaderboard-option');
    Memory.LeaderBoardButtonsArr[0].addEventListener('click', showLeaderboard);
    Memory.LeaderBoardButtonsArr[1].addEventListener('click', showLeaderboard);
    Memory.toLeaderBoard = document.getElementById('add-to-leaderboard');
    Memory.toLeaderBoard.addEventListener('click', toLeaderboardFunc);
}
function initializeGame() {
    clearBoard();
    Memory.leaderboard.style.display = 'none';
    let userNumber = parseInt(document.getElementById('requested-cards').value);
    if (userNumber % 2 !== 0) {
        userNumber += 1;
    }
    if (userNumber > 36) {
        userNumber = 36;
    }
    if (userNumber < 2) {
        userNumber = 2;
    }
    Memory.numOfCards = userNumber;
    createRandomArrayWithPairs();
    createPlayerArray();
    createDeck();
    Memory.foundPairs = 0;
    Memory.isFirstOfRound = true;
    Memory.cardsGuessed = 0;
    Memory.invisibleBlocker = document.createElement('div');
    Memory.invisibleBlocker.id = "invisible-blocker";
    Memory.boardContainer.appendChild(Memory.invisibleBlocker);
    Memory.newGameField = document.getElementById('new-game-field');
    Memory.newGameField.style.display = "none";
}
function clearBoard() {
    while (Memory.boardContainer.firstChild) {
        Memory.boardContainer.removeChild(Memory.boardContainer.firstChild);
    }
}

function showNewGameField() {
    Memory.winningMessage.style.display = "none";
    Memory.guessesCounter = 0;
    document.getElementById('guesses').innerHTML = "Current guesses: " + Memory.guessesCounter;
    Memory.newGameField.style.display = "block";
}
//***************************** LEADERBOARD ********************************
function newLeaderboardEntry() {
    let lastGameNum = JSON.parse(localStorage.leaderboardArray).length;
    let currentGameName = "UserGame" + (lastGameNum + 1);
    let newEntry = new leaderboardEntry(currentGameName, Memory.guessesCounter, Memory.numOfCards);
    let parsedLeaderboardArr = JSON.parse(localStorage.leaderboardArray);
    parsedLeaderboardArr.push(newEntry);
    localStorage.leaderboardArray = JSON.stringify(parsedLeaderboardArr);
    Memory.leaderboardArray = JSON.parse(localStorage.leaderboardArray);
}

function showLeaderboard() {
    clearBoard();
    Memory.leaderboardTable = document.getElementById("leaderboard-table");
    while (Memory.leaderboardTable.firstChild) {
        Memory.leaderboardTable.removeChild(Memory.leaderboardTable.firstChild);
    }
    let tr1 = document.createElement('tr');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    th1.innerHTML = "Game";
    th2.innerHTML = "Guesses";
    th3.innerHTML = "Cards";
    th4.innerHTML = "Score";
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    tr1.appendChild(th3);
    tr1.appendChild(th4);
    Memory.leaderboardTable.appendChild(tr1);
    for (var i = 0; i < Memory.leaderboardArray.length; i++) {
        addEntryToLeaderBoard(i);
    }
    Memory.winningMessage.style.display = 'none';
    Memory.leaderboard.style.display = 'block';
}
function toLeaderboardFunc() {
    newLeaderboardEntry();
    addEntryToLeaderBoard(Memory.leaderboardArray.length - 1);
    Memory.toLeaderBoard.style.display = 'none';

}
function addEntryToLeaderBoard(entry) {
    let currentRow = document.createElement('tr');
    let userGame = document.createElement('td');
    userGame.innerHTML = Memory.leaderboardArray[entry].game;
    currentRow.appendChild(userGame);
    let userGuesses = document.createElement('td');
    userGuesses.innerHTML = Memory.leaderboardArray[entry].guesses;
    currentRow.appendChild(userGuesses);
    let userCards = document.createElement('td');
    userCards.innerHTML = Memory.leaderboardArray[entry].cards;
    currentRow.appendChild(userCards);
    let userScore = document.createElement('td');
    userScore.innerHTML = Memory.leaderboardArray[entry].score;
    currentRow.appendChild(userScore);
    Memory.leaderboardTable.appendChild(currentRow);
}

//***************************** CARD SETUP ********************************
function createRandomNumbers(lengthOfArray, rangeOfRandom) {
    var organizedMap = new Map();
    organizedArr = [];
    for (var i = 0; i < lengthOfArray; i++) {
        var randomNumber = Math.floor(Math.random() * rangeOfRandom);
        while (organizedMap.has(randomNumber)) {
            randomNumber = Math.floor(Math.random() * rangeOfRandom);
        }
        organizedArr.push(randomNumber);
        organizedMap.set(randomNumber, null);
    }
    return organizedArr;
}
function createRandomArrayWithPairs() {
    Memory.numOfPairs = Memory.numOfCards / 2;
    var pairsArr = createRandomNumbers(Memory.numOfPairs, Memory.allPhotos.length);
    pairsArr = pairsArr.concat(pairsArr);
    var randomIndexes = createRandomNumbers(Memory.numOfCards, Memory.numOfCards);
    Memory.cardsOrder = [];
    for (var i = 0; i < randomIndexes.length; i++) {
        currentIndex = randomIndexes[i];
        Memory.cardsOrder[currentIndex] = pairsArr[i];
    }
}
function createDeck() {
    for (var i = 0; i < Memory.cardsOrder.length; i++) {
        let currentCardCode = Memory.cardsOrder[i];
        createCard(currentCardCode);
    }
}
function createCard(playerNum) {
    Memory.cardContainer = document.createElement('div');
    Memory.cardContainer.className = `card-container ${playerNum}`;
    Memory.cardContainer.addEventListener('click', showFrontOfCard);
    Memory.cardBack = document.createElement('div');
    Memory.cardBack.className = `card-back ${playerNum}`;
    Memory.cardFront = document.createElement('div');
    Memory.cardFront.className = `card-front ${playerNum}`;
    Memory.cardFront.style.backgroundImage = `url(${Memory.allPlayers[playerNum].url})`;
    Memory.cardBack.appendChild(Memory.cardFront);
    Memory.cardContainer.appendChild(Memory.cardBack);
    Memory.boardContainer.appendChild(Memory.cardContainer);
}
function findPlayerName(arrayNum) {
    let imgName = Memory.allPhotos[arrayNum].split("./Gallery/")[1];
    return imgName.split(".png")[0];;
}
function createPlayerArray() {
    Memory.allPlayers = [];
    for (var i = 0; i < Memory.allPhotos.length; i++) {
        var someNum = i;
        someNum = new Player(findPlayerName(i), Memory.allPhotos[i])
        Memory.allPlayers.push(someNum);
    }
}
//***************************** DURING GAME ********************************
function showFrontOfCard(event) {
    if (Memory.isFirstOfRound === true) {
        Memory.cardsGuessed += 1;
        if (Memory.cardsGuessed === 2) {
            Memory.isFirstOfRound = false;
        }
    }
    Memory.frontOfLastCard = Memory.frontOfCurrentCard;
    Memory.frontOfCurrentCard = event.srcElement.firstChild;
    Memory.frontOfCurrentCard.style.display = "block";
    if (Memory.frontOfLastCard !== Memory.cardBack) {
        checkIfPair();
    }
}
function checkIfPair(event) {
    if (Memory.isFirstOfRound === true) {
        return;
    }
    if (Memory.frontOfLastCard.className === Memory.frontOfCurrentCard.className) {
        Memory.foundPairs += 1;
        Memory.frontOfCurrentCard = Memory.cardBack;
        if (Memory.foundPairs === Memory.numOfPairs) {
            setTimeout(function () {
                clearBoard();
                Memory.winningMessage.style.display = 'block';
                Memory.toLeaderBoard.style.display = 'block';
            }, 900);
        }
    } else {
        Memory.invisibleBlocker.style.display = 'block';
        setTimeout(function () {
            Memory.frontOfLastCard.style.display = 'none';
            Memory.frontOfCurrentCard.style.display = 'none';
            Memory.frontOfCurrentCard = Memory.cardBack;
            updateGuessesCounter();
            Memory.invisibleBlocker.style.display = 'none';
        }, 1000);
    }
}
function updateGuessesCounter() {
    Memory.guessesCounter += 1;
    document.getElementById('guesses').innerHTML = "Current guesses: " + Memory.guessesCounter;
}


// find out about transition/ animation for flip that works on click/show
