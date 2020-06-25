import React from 'react';
import { useGameState } from '../context/game-context';
import ApiHandler from '../models/api-handler';

function GameView() {
  const { state, dispatch } = useGameState();

  async function startNewGame() {
    const { deckId } = await ApiHandler.getDeckId();
    const { card, remaining } = await ApiHandler.drawCard(deckId);
    dispatch({ type: 'init', deckId, card, remaining });
  }

  async function drawCard() {
    return await ApiHandler.drawCard(state.deckId!);
  }

  async function guessHigher() {
    const { card, remaining } = await drawCard();
    if (card.numbericValue > state.currentCard!.numbericValue) {
      dispatch({ type: 'increaseScore' });
    }
    dispatch({ type: 'updateCard', card, remaining });
  }

  async function guessLower() {
    const { card, remaining } = await drawCard();
    if (card.numbericValue < state.currentCard!.numbericValue) {
      dispatch({ type: 'increaseScore' });
    }
    dispatch({ type: 'updateCard', card, remaining });
  }

  if (!state.isRunning) {
    return (
      <div>
        <h2>Would you like to start a game?</h2>
        <button onClick={startNewGame}>Start new Game</button>
      </div>
    );
  }

  return (
    <div>
      <div>Score: {state.score}</div>
      <div>Remaining cards: {state.remaining}</div>

      {state.currentCard ? (
        <>
          <div>
            <img
              style={{ width: '130px', height: '200px' }}
              src={state.currentCard?.image}
              alt=''
            />
          </div>

          <button onClick={guessHigher}>Higher</button>
          <button onClick={guessLower}>Lower</button>
        </>
      ) : (
        <button onClick={drawCard}>Draw a card</button>
      )}
    </div>
  );
}

export default GameView;
