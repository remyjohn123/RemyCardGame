const DeckOfCardsService = require('./DeckOfCardsService');
const BlackJackGame = require('./BlackJackGame');

const deckOfCardsService = new DeckOfCardsService();
const bjGame = new BlackJackGame(deckOfCardsService);

async function playGame() {
  try {
    let playerCount = 2;
    let drawCount = 3;

    //call playBlackJack get the cards for the players
    let playersCardDataArray = await bjGame.playBlackJack(playerCount, drawCount);

    //check any player has Black Jack  
    let player1Bj = await bjGame.checkForBlackJack(playersCardDataArray[0]);
    let player2Bj = await bjGame.checkForBlackJack(playersCardDataArray[1]);
  
    if (player1Bj && player2Bj) console.log("Both players have blackjack");
    else if (player1Bj && !player2Bj) console.log("Player 1 has blackjack");
    else if (!player1Bj && player2Bj) console.log("Player 2 has blackjack");
    else console.log("None of the players have blackjack");
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

playGame();