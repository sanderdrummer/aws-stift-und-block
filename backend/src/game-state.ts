import { throwNewQuixxDice } from "./quixx-dice";

interface Player {
  name: string;
  id: string;
}

interface QuixxRound {
  nextPlayer: Player;
  currentPlayer: Player;
  finished: boolean;
  dice: { color: string; value: number }[];
}

interface QuixxState {
  rounds: QuixxRound[];
  players: Player[];
}

export let state: QuixxState = {
  rounds: [],
  players: [],
};

const getNextRound = ({ rounds, players }: QuixxState) => {
  const count = rounds.length;
  const nextPlayerIndex = (count + 1) % players.length;
  const nextPlayer = players[nextPlayerIndex];
  const currentPlayer = players[count % players.length];
  return {
    dice: throwNewQuixxDice(),
    nextPlayer: nextPlayer,
    currentPlayer,
    finished: false,
  };
};

export const updateGameState = (action) => {
  switch (action.type) {
    case "newGame": {
      state = {
        players: [],
        rounds: [],
      };
      break;
    }

    case "nextRound": {
      state.rounds.push(getNextRound(state));
      break;
    }
    case "finishRound": {
      state.rounds[state.rounds.length - 1].finished = true;
      break;
    }
    case "removePlayer":
      break;

    case "addPlayer": {
      const nextPlayer = { name: action.name, id: action.connectionId };
      state.players.push(nextPlayer);
      break;
    }
  }
  return state;
};
