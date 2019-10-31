/*
 * Create a list that holds all of your cards
 */
let allMyCards = ['diamond', 'diamond',
                'plane', 'plane',
                'anchor', 'anchor',
                'bolt', 'bolt',
                'cube', 'cube',
                'leaf', 'leaf',
                'bicycle', 'bicycle',
                'bomb', 'bomb'
                ]
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// this runs every time we pick a new card
function pickCard(event) {
    let myCard = event.target;
/* This IF checks to make sure it is actually a card we have selected,
 * to see that we haven't selected if already, or we haven't already selected two cards.
 */
    if (!myCard.classList.contains('card') || myCard.classList.contains('show') || checkList.length == 2) { return 0; }
// Get the card ready to match 
       addToList(myCard);
   }

function addToList(myCard) {
// add to the list of open cards
    if(!myCard.classList.contains('show')) {
        myCard.classList.toggle('show');
     
    checkList.push(myCard);

 // IF FIRST CARD 
    if(myCard.classList == checkList[0].classList && checkList[1] === undefined) {
    myCard.classList.toggle('animated');
    if (numMoves == 0) {
        // Here we set a time that runs for the rest of the match
        let myTimer = setInterval(function(){
            gameTimer.matchTime -= 1;
            let minutes = Math.floor(gameTimer.matchTime / 60);
            let seconds = gameTimer.matchTime - minutes * 60;
            if (seconds < 10) {
                gameTimer.timerBoard.textContent = minutes + ':0' + seconds;
            }
            else {
                gameTimer.timerBoard.textContent = minutes + ':' + seconds;
            }
            // If the time runs out, the game ends
            if (gameTimer.matchTime <= 0) {
                resetGame();
                clearInterval(myTimer);
                alert('Sorry, you have run out of time!');
            }
        }, 1000);
    }
   }
    // IF CARDS DONT MATCH 
    else if(myCard.classList[1] != checkList[0].classList[1] && checkList[1] !== undefined) {
        myCard.classList.toggle('animated');
        setTimeout(function(){
        checkList[0].classList.toggle('show');
        checkList[0].classList.toggle('animated');
        myCard.classList.toggle('show'); 
        myCard.classList.toggle('animated');
    checkList.length = 0;
        }, 1000)  
        numMoves += 1;
        moveCounter.textContent = numMoves;
        if (numMoves == 10 || numMoves == 20) {
            removeStar();
        }
    }
    // IF CARDS MATCH 
    else {
        myCard.classList.toggle('animated');
        numMoves += 1;
        moveCounter.textContent = numMoves;
        if (numMoves == 10 || numMoves == 20) {
            removeStar();
        }
        lockCards(checkList);
        checkList.length = 0;     
    }
}
}
// this function locks two cards in a match 
function lockCards(...checkList){
    matchCounter += 1;
   const lockedCards = document.querySelectorAll('.show');
   lockedCards.forEach(function(card) {
     card.classList.add('match');
   });
   checkList.length = 0;
   // If you get 8 matches, you win
   if (matchCounter == 8) { 
       alert('You win!!! You used ' + numMoves + ' moves.') 
       matchCounter = 0;
       resetGame();
    }
}
// removes one of the stars from the scoreboard
function removeStar() {
    document.querySelector('.fa-star').remove();
}
// resets scoreboard to 3 stars
function addStars() {
    const starFragment = document.createDocumentFragment();
    let i = 0;
    for (i = 0; i < 3; i++) { 
        const newStar = document.createElement('li');
        const newStarPiece = document.createElement('i');
        newStarPiece.classList.add('fa', 'fa-star');
        newStar.appendChild(newStarPiece);
        starFragment.appendChild(newStar);
    }
        scoreBoard.appendChild(starFragment);

}

function resetGame() {
    const cardsToReset = document.querySelectorAll('.card');
    cardsToReset.forEach(function(card) {
        card.classList.remove('match', 'show');
        numMoves = 0;
        checkList.length = 0;
        moveCounter.textContent = numMoves;
        while(cardDeck.hasChildNodes()) {
            cardDeck.removeChild(cardDeck.firstChild);
        }
        while(scoreBoard.hasChildNodes()) {
            scoreBoard.removeChild(scoreBoard.firstChild);
        }
      }); 
      createNewDeck();
      addStars();
      gameTimer.matchTime = 300;

}

// Create a variable to hold our card deck
const cardDeck = document.querySelector('.deck'); 
// Create a variable to hold our reset game button
const newGame = document.querySelector('.restart');
// These variables are used for our move counter
const moveCounter = document.querySelector('.moves');
// Holds the scoreboard with the stars
const scoreBoard = document.querySelector('.stars');
// Start the match with zero moves
let numMoves = 0;
// This is the variable used to hold a list of cards we will check as we click them
let checkList = [];
// This variable is used to count how many matches we have
let matchCounter = 0;
// This times the match once we pick our first card
const timerBoard = document.querySelector('.timer');
gameTimer = {
    timerBoard: document.querySelector('.timer'),
    matchTime: 300
};

cardDeck.addEventListener('click', pickCard);
newGame.addEventListener('click', resetGame);

createNewDeck();
addStars();

// This is the function that builds each new deck
function createNewDeck(){
    let i;
    shuffle(allMyCards);
    for (i = 0; i < 16; i++) { 
        const fragment = document.createDocumentFragment();
        const newCard = document.createElement('li');
        const newFace = document.createElement('i');
        newCard.classList.add('card', allMyCards[i]);
        newFace.classList.add('fa', 'fa-' + allMyCards[i]);
        newCard.appendChild(newFace);
        fragment.appendChild(newCard);
        cardDeck.appendChild(fragment);
    }
}