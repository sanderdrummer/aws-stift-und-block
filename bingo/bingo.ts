const bingoSheetOptions = {
  B: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  I: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  N: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  G: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
  O: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
};

export let leftOver = [];
export let drawn = [];
export let players = [];

const drawNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const initLeftOver = () => {
  return Object.keys(bingoSheetOptions).reduce((entries, key) => {
    return [
      ...entries,
      ...bingoSheetOptions[key].map((value) => `${key}${value}`),
    ];
  }, []);
};
export const draw = () => {
  if (leftOver.length === 0) {
    leftOver = initLeftOver();
  }

  const index = drawNumber(0, leftOver.length - 1);
  const [ball] = leftOver.splice(index, 1);
  drawn.push(ball);
};

export const removePlayer = (id) => {
  players = players.filter((player) => player.id !== id);
};

export const reset = () => {
  leftOver = [];
  drawn = [];
  players = [];
};

export const handleAction = (action, options = { id: "" }) => {
  switch (action.type) {
    case "draw": {
      draw();
      return { type: "updateGameState", gameState: drawn };
    }
    case "addBingoPlayer": {
      players.push({ name: action.name, id: options.id });
      console.log({ players });
      return { type: "setPlayers", players };
    }
    case "newGame": {
      reset();
    }
  }
};
