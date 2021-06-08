import React, { useState, useEffect } from "react";
import "./App.css";

import Grid from "./Grid";
import StartingScreen from "./StartingScreen";
import GameOverScreen from "./GameOverScreen";

enum GameStates {
  START = "start",
  GAME_OVER = "game_over",
  PLAING = "plaing",
}

function App() {
  // useEffect(() => {
  //   window.addEventListener("keydown", (e: KeyboardEvent): void => {
  //     if (e.key === " " && gameState !== GameStates.PLAING) {
  //       setGameState(GameStates.PLAING);
  //     }
  //   });
  // }, []);
  const [score, setScore] = useState<number>(0);
  const [gridRows, setGridRows] = useState<number>(15);
  const [gridCols, setGridCols] = useState<number>(15);
  const [gameState, setGameState] = useState<string>(GameStates.START);

  const handleGameOver = () => {
    setGameState(GameStates.GAME_OVER);
  };

  const handleResetGame = () => {
    setGameState(GameStates.PLAING);
    setScore(0);
  };

  const renderStage = (gameState: string): React.ReactNode => {
    switch (gameState) {
      case GameStates.START:
        return <StartingScreen />;
      case GameStates.GAME_OVER:
        return <GameOverScreen score={score} />;
      case GameStates.PLAING:
        return (
          <Grid
            gridRows={gridRows}
            gridCols={gridCols}
            handleGameOver={handleGameOver}
            setScore={setScore}
            score={score}
          />
        );
    }
  };

  return (
    <div className="App">
      <header>Snake game</header>
      <div>
        {gameState === GameStates.START && (
          <button onClick={() => setGameState(GameStates.PLAING)}>
            Start Game
          </button>
        )}
        {gameState === GameStates.GAME_OVER && (
          <button onClick={handleResetGame}>Reset Game</button>
        )}
      </div>
      <div>Score: {score}</div>
      {renderStage(gameState)}
    </div>
  );
}

export default App;
