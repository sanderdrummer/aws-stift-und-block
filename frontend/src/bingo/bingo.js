import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import React from "react";

import { useDraw } from "./store";
import { CardContent, Card, CardHeader, Fab } from "@material-ui/core";

const bingoSheetOptions = {
  B: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  I: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  N: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  G: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
  O: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const createBingoSheet = () => {
  return Object.keys(bingoSheetOptions).reduce((sheet, letter) => {
    const options = bingoSheetOptions[letter];
    let row = [];
    while (row.length < 5) {
      const index = randomIntFromInterval(0, options.length - 1);
      const num = options[index];
      if (!row.includes(num)) {
        row.push(num);
      }
    }
    return { ...sheet, [letter]: row };
  }, {});
};

const useBingoSheet = () => {
  //@ts-ignore
  const [sheet, setSheet] = React.useState({});
  const [checked, setChecked] = React.useState({});
  const recreate = () => {
    const newSheet = createBingoSheet();
    window.localStorage.setItem("bingo", JSON.stringify(newSheet));
    setChecked({});
    setSheet(newSheet);
    window.localStorage.setItem("checks", JSON.stringify({}));
  };

  const check = (key) => {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    window.localStorage.setItem("checks", JSON.stringify(next));
  };

  React.useEffect(() => {
    const saveSheet = window.localStorage.getItem("bingo");
    const saveChecks = window.localStorage.getItem("checks");
    if (saveSheet) {
      setSheet(JSON.parse(saveSheet));
    }
    if (saveChecks) {
      setChecked(JSON.parse(saveChecks));
    }
  }, []);

  return {
    sheet,
    recreate,
    checked,
    check,
  };
};

export const BingoBlock = () => {
  const { sheet, recreate, checked, check } = useBingoSheet();
  const handleClick = (key) => {
    check(key);
  };

  if (sheet && sheet.B && sheet.B[0]) {
    return (
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">B</TableCell>
                <TableCell align="center">I</TableCell>
                <TableCell align="center">N</TableCell>
                <TableCell align="center">G</TableCell>
                <TableCell align="center">O</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" onClick={() => handleClick("b0")}>
                  <Box
                    bgcolor={checked["b0"] ? "secondary.main" : undefined}
                    color={checked["b0"] ? "white" : undefined}
                  >
                    {sheet.B[0]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("i0")}>
                  <Box
                    bgcolor={checked["i0"] ? "secondary.main" : undefined}
                    color={checked["i0"] ? "white" : undefined}
                  >
                    {sheet.I[0]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("n0")}>
                  <Box
                    bgcolor={checked["n0"] ? "secondary.main" : undefined}
                    color={checked["n0"] ? "white" : undefined}
                  >
                    {sheet.N[0]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("g0")}>
                  <Box
                    bgcolor={checked["g0"] ? "secondary.main" : undefined}
                    color={checked["g0"] ? "white" : undefined}
                  >
                    {sheet.G[0]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("o0")}>
                  <Box
                    bgcolor={checked["o0"] ? "secondary.main" : undefined}
                    color={checked["o0"] ? "white" : undefined}
                  >
                    {sheet.O[0]}
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" onClick={() => handleClick("b1")}>
                  <Box
                    bgcolor={checked["b1"] ? "secondary.main" : undefined}
                    color={checked["b1"] ? "white" : undefined}
                  >
                    {sheet.B[1]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("i1")}>
                  <Box
                    bgcolor={checked["i1"] ? "secondary.main" : undefined}
                    color={checked["i1"] ? "white" : undefined}
                  >
                    {sheet.I[1]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("n1")}>
                  <Box
                    bgcolor={checked["n1"] ? "secondary.main" : undefined}
                    color={checked["n1"] ? "white" : undefined}
                  >
                    {sheet.N[1]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("g1")}>
                  <Box
                    bgcolor={checked["g1"] ? "secondary.main" : undefined}
                    color={checked["g1"] ? "white" : undefined}
                  >
                    {sheet.G[1]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("o1")}>
                  <Box
                    bgcolor={checked["o1"] ? "secondary.main" : undefined}
                    color={checked["o1"] ? "white" : undefined}
                  >
                    {sheet.O[1]}
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" onClick={() => handleClick("b2")}>
                  <Box
                    bgcolor={checked["b2"] ? "secondary.main" : undefined}
                    color={checked["b2"] ? "white" : undefined}
                  >
                    {sheet.B[2]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("i2")}>
                  <Box
                    bgcolor={checked["i2"] ? "secondary.main" : undefined}
                    color={checked["i2"] ? "white" : undefined}
                  >
                    {sheet.I[2]}
                  </Box>
                </TableCell>
                <TableCell align="center">BINGO</TableCell>
                <TableCell align="center" onClick={() => handleClick("g2")}>
                  <Box
                    bgcolor={checked["g2"] ? "secondary.main" : undefined}
                    color={checked["g2"] ? "white" : undefined}
                  >
                    {sheet.G[2]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("o2")}>
                  <Box
                    bgcolor={checked["o2"] ? "secondary.main" : undefined}
                    color={checked["o2"] ? "white" : undefined}
                  >
                    {sheet.O[2]}
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" onClick={() => handleClick("b3")}>
                  <Box
                    bgcolor={checked["b3"] ? "secondary.main" : undefined}
                    color={checked["b3"] ? "white" : undefined}
                  >
                    {sheet.B[3]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("i3")}>
                  <Box
                    bgcolor={checked["i3"] ? "secondary.main" : undefined}
                    color={checked["i3"] ? "white" : undefined}
                  >
                    {sheet.I[3]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("n3")}>
                  <Box
                    bgcolor={checked["n3"] ? "secondary.main" : undefined}
                    color={checked["n3"] ? "white" : undefined}
                  >
                    {sheet.N[3]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("g3")}>
                  <Box
                    bgcolor={checked["g3"] ? "secondary.main" : undefined}
                    color={checked["g3"] ? "white" : undefined}
                  >
                    {sheet.G[3]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("o3")}>
                  <Box
                    bgcolor={checked["o3"] ? "secondary.main" : undefined}
                    color={checked["o3"] ? "white" : undefined}
                  >
                    {sheet.O[3]}
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" onClick={() => handleClick("b4")}>
                  <Box
                    bgcolor={checked["b4"] ? "secondary.main" : undefined}
                    color={checked["b4"] ? "white" : undefined}
                  >
                    {sheet.B[4]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("i4")}>
                  <Box
                    bgcolor={checked["i4"] ? "secondary.main" : undefined}
                    color={checked["i4"] ? "white" : undefined}
                  >
                    {sheet.I[4]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("n4")}>
                  <Box
                    bgcolor={checked["n4"] ? "secondary.main" : undefined}
                    color={checked["n4"] ? "white" : undefined}
                  >
                    {sheet.N[4]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("g4")}>
                  <Box
                    bgcolor={checked["g4"] ? "secondary.main" : undefined}
                    color={checked["g4"] ? "white" : undefined}
                  >
                    {sheet.G[4]}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={() => handleClick("o4")}>
                  <Box
                    bgcolor={checked["o4"] ? "secondary.main" : undefined}
                    color={checked["o4"] ? "white" : undefined}
                  >
                    {sheet.O[4]}
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={6} mb={6}>
          <Paper>
            <Button onClick={recreate}>NEUER BLOCK</Button>
          </Paper>
        </Box>
      </>
    );
  } else {
    return <Button onClick={recreate}>NEUER BLOCK</Button>;
  }
};

export const DrawState = () => {
  const { draw, newGame, gameState } = useDraw();
  return (
    <Box>
      <Card>
        <CardHeader
          title="Gezogene Bälle"
          action={<Button onClick={draw}>ziehen!</Button>}
        />
        <CardContent>
          <Box display="flex" flexWrap="wrap">
            {gameState.map((value) => (
              <Box m={1} key={value}>
                <Fab>{value}</Fab>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Box mt={6}>
        <Button onClick={newGame}>neues spiel!</Button>
      </Box>
    </Box>
  );
};

export const Bingo = () => {
  return (
    <Box mt={4}>
      <BingoBlock />
      <DrawState />
    </Box>
  );
};
