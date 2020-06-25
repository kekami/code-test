import React, { ReactNode, useContext, Dispatch } from 'react';
import { Card } from '../models/api-handler';

type State = {
  isRunning: boolean;
  deckId?: string;
  currentCard?: Card;
  remaining?: number;
  score: number;
};

export type Action =
  | { type: 'init'; deckId: string; remaining: number }
  | { type: 'updateCard'; card: Card; remaining: number }
  | { type: 'increaseScore' };

const initialState: State = {
  isRunning: false,
  score: 0,
};

const GameStateContext = React.createContext<State>(initialState);
const GameDispatchContext = React.createContext<Dispatch<Action>>(() => null);

function gameReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'init': {
      return {
        ...state,
        isRunning: true,
        deckId: action.deckId,
        remaining: action.remaining,
      };
    }
    case 'updateCard': {
      return {
        ...state,
        isRunning: action.remaining > 0,
        currentCard: action.card,
        remaining: action.remaining,
      };
    }
    case 'increaseScore': {
      return {
        ...state,
        score: state.score + 1,
      };
    }
  }
}

type Props = {
  children: ReactNode;
};

const useGameState = () => {
  const state = useContext(GameStateContext);
  const dispatch = useContext(GameDispatchContext);

  return { state, dispatch };
};

function GameProvider(props: Props) {
  const [state, dispatch] = React.useReducer(gameReducer, initialState);
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {props.children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}
export { GameProvider, useGameState };
