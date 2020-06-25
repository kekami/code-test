import React from 'react';
import './App.css';
import GameView from './components/game-view';
import { GameProvider } from './context/game-context';

function App() {
  return (
    <div className='App'>
      <GameProvider>
        <GameView />
      </GameProvider>
    </div>
  );
}

export default App;
