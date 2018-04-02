/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
/* List that holds all of our cards */
let cards = [...card];
// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// deck of all cards in game
let deck = document.getElementsByClassName("deck");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// declare variables for star icons
let stars = document.querySelectorAll(".fa-star");

// stars list
let starsList = document.querySelectorAll(".stars li");

// list for opened cards to be stored.
let openedCards = [];
let rating = 3;

// set seconds and minutes to zero
// and get element from startTimer


//d
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// load the new Game function when broswer refresh to shuffle cards
document.body.onload = newGame();

//  function to start a new play
function newGame() {
  // shuffle deck
  cards = shuffle(cards);

  // remove all exisiting clsses from each card
  //add the new random classes back to deck
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("show", "open", "match", "disabled");
    deck[0].appendChild(cards[i]);
  }

  // reset moves
  moves = 0;
  counter.innerHTML = moves;
  // reset rating
  let rating = 3;
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }
  //reset timer
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);

}

function openCard() {
  openedCards.push(this);
  let olen = openedCards.length;
  if (olen === 2) {
    moveCounter();
    //from first opened card and second opened card
    //compare the first's child's(i tag) class name.If true match them.
    if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
      matched();
    } else {
      unmatched();
    }
  }
}

let displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
}

/* when we call match we add match and disable to opened openedCards
and we remove the show open */

function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  openedCards = [];
}

// description when cards don't match

function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function() {
    openedCards[0].classList.remove("show", "open", "unmatched");
    openedCards[1].classList.remove("show", "open", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
}
//  disable cards temporarily
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add('disabled');
  });
}

//  enable cards and disable matched cards

function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove('disabled');
    for (let i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

//fucntion to count moves of the player.

function moveCounter() {
  moves += 1;
  counter.innerHTML = moves;
  //setting rating when new game starts.
  rating = 3;
  //start timer on first click
  if (moves == 1) {
    startTimer();

  }
  // setting rates based on moves

  if (moves > 11 && moves < 16) {
    rating = rating - 1;
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.color = "black";
      }
    }
  } else if (moves > 15) {
    rating = rating - 2;
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.color = "black";

      }
    }
  }
}

//game timer
var second = 0,
  minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}
//end of game timer.

/*
 /* set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//congratulations when all cards match, show modal and moves, time and rating.

function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    ftime = timer.innerHTML;
    swal({
      title: "Congratulations!",
      text: "You made " + moves + " moves in " + ftime + " . Your rating was " + rating + " stars. Want to play again?",
      icon: "success",
      button: {
        text: "Play Again?",
        value: newGame(),
      },
      showCancelButton: true,
    });
  }
}

/* set up the event listener for a card. If a card is clicked:*/

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", displayCard);
  cards[i].addEventListener("click", openCard);
  cards[i].addEventListener("click", congratulations);
}
