import React from "react";
import Paper from "@material-ui/core/Paper";
import Form from "../Form";
import "./StartingScreen.css";

interface Props {
  handleStartGame: () => void;
  gridRows: number;
  gridCols: number;
  setGridRows: (v: number) => void;
  setGridCols: (v: number) => void;
}

const StartingScreen: React.FC<Props> = ({
  handleStartGame,
  gridRows,
  gridCols,
  setGridCols,
  setGridRows,
}) => {
  return (
    <Paper elevation={3} className="start-screen">
      <Form
        handleSubmit={handleStartGame}
        gridCols={gridCols}
        gridRows={gridRows}
        setGridCols={setGridCols}
        setGridRows={setGridRows}
        isStartScreen
      />
    </Paper>
  );
};

export default StartingScreen;
