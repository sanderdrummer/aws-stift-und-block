export const rollDice = () => {
  return Math.floor(Math.random() * (6 - 1 + 1) + 1);
};

export const throwNewQuixxDice = () => {
  const colors = ["grey", "grey", "darkorange", "red", "blue", "green"];
  return Object.values(colors).map((color) => ({ value: rollDice(), color }));
};
