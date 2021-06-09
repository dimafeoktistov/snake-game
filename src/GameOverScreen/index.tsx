import React from "react";
import Paper from "@material-ui/core/Paper";
import Form from "../Form";
import { Typography } from "@material-ui/core";

interface Props {
  handleResetGame: () => void;
  gridRows: number;
  gridCols: number;
  setGridRows: (v: number) => void;
  setGridCols: (v: number) => void;
  score: number;
}

const GameOverScreen: React.FC<Props> = ({
  score,
  handleResetGame,
  gridCols,
  gridRows,
  setGridCols,
  setGridRows,
}) => {
  return (
    <Paper elevation={3} className="start-screen">
      <Typography variant="h4">Your score is - {score}</Typography>
      <Form
        handleSubmit={handleResetGame}
        gridCols={gridCols}
        gridRows={gridRows}
        setGridCols={setGridCols}
        setGridRows={setGridRows}
        isStartScreen={false}
      />
    </Paper>
  );
};

export default GameOverScreen;
