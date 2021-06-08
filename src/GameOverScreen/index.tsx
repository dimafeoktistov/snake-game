import React from "react";

const GameOverScreen: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div>
      <div>Your score is - {score}</div>
      <div>Start a new game by pressing "Start Game" button</div>
    </div>
  );
};

export default GameOverScreen;
