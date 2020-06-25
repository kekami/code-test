import React from 'react';
import './App.css';
import GameView from './components/game-view';
import { GameProvider } from './context/game-context';
import ErrorBoundary from './components/error-boundary';

function App() {
  return (
    <div className='App'>
      <GameProvider>
        <ErrorBoundary>
          <GameView />
        </ErrorBoundary>
      </GameProvider>
    </div>
  );
}

export default App;
