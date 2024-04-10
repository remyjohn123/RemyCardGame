const axios = require("axios");
const baseUrl = "https://deckofcardsapi.com/";
const brandNewDeckUrl = `${baseUrl}api/deck/new/`;
const reShuffleUrl = (deckId) => `${baseUrl}api/deck/${deckId}/shuffle/`;
const drawCardUrl = (deckId, count) =>
  `${baseUrl}api/deck/${deckId}/draw/?count=${count}`;

class DeckOfCardsService {

 async callDeckOfCardsSite() {
    try {
      const response = await axios.get(baseUrl);
      return response;
    } catch (error) {
      console.error("Error while checking site is up or not:", error.message);
      return false;
    }
  }

  async getNewDeck() {
    try {
      const response = await axios.get(brandNewDeckUrl);
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("Failed to get new deck");
        return false;
      }
    } catch (error) {
      console.error("Error while getting new deck:", error.message);
      return false;
    }
  }

  async shuffleTheCards(deckId) {
    try {
      const response = await axios.get(reShuffleUrl(deckId));     
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        console.log("Failed to shuffle cards");
        return false;
      }
    } catch (error) {
      console.error("Error while shuffling cards:", error.message);
      return false;
    }
  }

  async drawCards(deckId, drawCount) {
    try {
      const response = await axios.get(drawCardUrl(deckId, drawCount));
      if (response.status === 200) {
        return response.data.cards;
      } else {
        console.log("Failed to get new deck");
        return false;
      }
    } catch (error) {
      console.error("Error while dealing cards to players:", error.message);
      return false;
    }
  }
}

module.exports = DeckOfCardsService;
