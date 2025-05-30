let deck, playerHand, dealerHand;

function createDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
  return shuffle(deck);
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function startGame() {
  deck = createDeck();
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  document.getElementById("message").textContent = "";
  updateUI();
}

function hit() {
  playerHand.push(deck.pop());
  updateUI();
  if (calculateScore(playerHand) > 21) {
    document.getElementById("message").textContent = "You busted! Dealer wins.";
  }
}

function stand() {
  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  let message;
  if (dealerScore > 21 || playerScore > dealerScore) {
    message = "You win!";
  } else if (playerScore < dealerScore) {
    message = "Dealer wins!";
  } else {
    message = "It's a tie!";
  }
  document.getElementById("message").textContent = message;
  updateUI();
}

function calculateScore(hand) {
  let score = 0;
  let aces = 0;

  for (let card of hand) {
    if (['J', 'Q', 'K'].includes(card.value)) {
      score += 10;
    } else if (card.value === 'A') {
      score += 11;
      aces += 1;
    } else {
      score += parseInt(card.value);
    }
  }

  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }

  return score;
}

function updateUI() {
  const playerCardsDiv = document.getElementById("player-cards");
  const dealerCardsDiv = document.getElementById("dealer-cards");

  playerCardsDiv.innerHTML = "";
  dealerCardsDiv.innerHTML = "";

  for (let card of playerHand) {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.textContent = card.value + card.suit;
    playerCardsDiv.appendChild(cardEl);
  }

  for (let card of dealerHand) {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.textContent = card.value + card.suit;
    dealerCardsDiv.appendChild(cardEl);
  }

  document.getElementById("player-score").textContent = "Score: " + calculateScore(playerHand);
  document.getElementById("dealer-score").textContent = "Score: " + calculateScore(dealerHand);
}
