import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

interface Props {
  handleSubmit: () => void;
  gridRows: number;
  gridCols: number;
  setGridRows: (v: number) => void;
  setGridCols: (v: number) => void;
  isStartScreen: boolean;
}

const Form: React.FC<Props> = ({
  handleSubmit,
  gridCols,
  gridRows,
  setGridCols,
  setGridRows,
  isStartScreen,
}) => (
  <form onSubmit={handleSubmit} className="start-form">
    <Typography variant="h5">
      Start game by pressing {isStartScreen ? '"Start game"' : '"Restart game"'}{" "}
      button
    </Typography>
    <div className="text-fields">
      <TextField
        variant="outlined"
        required
        id="gridRows"
        label="Number of rows"
        defaultValue={15}
        type="number"
        InputProps={{ inputProps: { min: 10, max: 20 } }}
        value={gridRows}
        onChange={(e) => setGridRows(Number(e.target.value))}
        style={{ width: 200 }}
      />
      <TextField
        required
        variant="outlined"
        id="gridCols"
        label="Number of columns"
        defaultValue={15}
        type="number"
        InputProps={{ inputProps: { min: 10, max: 25 } }}
        value={gridCols}
        onChange={(e) => setGridCols(Number(e.target.value))}
        style={{ width: 200 }}
      />
    </div>
    <Button color="primary" size="large" variant="contained" type="submit">
      {isStartScreen ? "Start game" : "Restart game"}
    </Button>
  </form>
);

export default Form;
