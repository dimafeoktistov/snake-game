import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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

  const handleStartGame = () => {
    setGameState(GameStates.PLAING);
  };

  const renderStage = (gameState: string): React.ReactNode => {
    switch (gameState) {
      case GameStates.START:
        return (
          <StartingScreen
            handleStartGame={handleStartGame}
            gridRows={gridRows}
            gridCols={gridCols}
            setGridCols={setGridCols}
            setGridRows={setGridRows}
          />
        );
      case GameStates.GAME_OVER:
        return (
          <GameOverScreen
            score={score}
            handleResetGame={handleResetGame}
            gridRows={gridRows}
            gridCols={gridCols}
            setGridCols={setGridCols}
            setGridRows={setGridRows}
          />
        );
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
      <AppBar>
        <Toolbar>
          <Typography variant="h5">Snake game. Score: {score}</Typography>
        </Toolbar>
      </AppBar>
      <div className="container">{renderStage(gameState)}</div>
    </div>
  );
}

export default App;
