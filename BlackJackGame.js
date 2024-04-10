class BlackJackGame {
  constructor(deckService) {
    this.deckService = deckService;
  }

  
  async isSiteUp() {
    const response = await this.deckService.callDeckOfCardsSite();
    if (response.status === 200) {
      console.log("The site is up");
      return true;
    } else {
      console.log("The site is down");
      return false;
    }
  }

  
  async getNewDeck() {
    const data = await this.deckService.getNewDeck();
    return data.deck_id;
  }

  //Shuffle the cards for the deck
  async shuffleDeck(deckId) {
    const data = await this.deckService.shuffleTheCards(deckId);
    return data.shuffled;
  }

  
  async dealCardsToPlayers(deckId, playerCount, drawCount) {
    let playersCardArray = [];

    for (let i = 0; i < playerCount; i++) {
      const cards = await this.deckService.drawCards(deckId, drawCount);

      playersCardArray[i] = cards;
    }
    return playersCardArray;
  }

  async playBlackJack(playerCount, drawCount) {
    //check if the site is Up
    if (!(await this.isSiteUp())) {
      console.log("Fail to proceed, the site is down.");
      return;
    }

    //Call to get the new Deck and get deckId
    let deckId = await this.getNewDeck();
    console.log("deckId: ", deckId);
    if (!deckId) {
      console.log("Failed to get new deck Id");
      return;
    }

    //Shuffle the card for the above deckId
    if (!(await this.shuffleDeck(deckId))) {
      console.log("Fail to shuffle deck");
      return;
    }
    
    //deal the cards to players and get the card data for all players
    let playersCardDataArray = await this.dealCardsToPlayers(
      deckId,
      playerCount,
      drawCount
    );
    console.log("playersCardDataArray ", playersCardDataArray);

    return playersCardDataArray;
  }

  async checkForBlackJack(playerCards) {
    const refValues = { JACK: 10, QUEEN: 10, KING: 10, ACE: 11 };

    //get the sum of the cards with array reduce function
    let sum = playerCards.reduce((accumulator, currentCard) => {
      if (refValues[currentCard.value])
        return accumulator + refValues[currentCard.value];
      return accumulator + parseInt(currentCard.value);
    }, 0);

    // If the sum is grater than 21, then value of ACE should be 1
    if (sum > 21 && playerCards.some((card) => card.value === "ACE")) {
      // Subtract 10 to adjust the value of ACE from 11 to 1
      sum -= 10;
    }

    console.log("sum  ", sum);
    return sum === 21; //return true if the some is 21
  }
}

module.exports = BlackJackGame;
