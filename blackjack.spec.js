const { test, expect } = require('@playwright/test');
const DeckOfCardsService = require('./DeckOfCardsService');
const BlackJackGame = require('./BlackJackGame');

const deckOfCardsService = new DeckOfCardsService();
const bjGame = new BlackJackGame(deckOfCardsService);

test.describe('BlackJackGame', () => {  

  test('checkForBlackJack should return as blackjack', async () => {
    const playerCards = [{ value: 'ACE' }, { value: '8' }, { value: '3' }]; // Cards for player with blackjack

    // Check for blackjack
    const hasBlackjack = await bjGame.checkForBlackJack(playerCards);

    // Assert the result
    expect(hasBlackjack).toBe(true);
  });

  test('checkForBlackJack should return as blackjack', async () => {
    const playerCards = [{ value: 'ACE' }, { value: '10' }, { value: 'QUEEN' }]; // Cards for player with blackjack

    // Check for blackjack
    const hasBlackjack = await bjGame.checkForBlackJack(playerCards);

    // Assert the result
    expect(hasBlackjack).toBe(true);
  });

  test('checkForBlackJack should return not as blackjack', async () => {
    const playerCards = [{ value: 'ACE' }, { value: '9' }, { value: 'QUEEN' }]; // Cards for player with blackjack

    // Check for blackjack
    const hasBlackjack = await bjGame.checkForBlackJack(playerCards);

    // Assert the result
    expect(hasBlackjack).toBe(false);
  });

});
