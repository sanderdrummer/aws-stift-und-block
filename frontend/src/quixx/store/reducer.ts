interface Player {
  name: string;
  id: string;
}

interface QuixxRound {
  nextPlayer: Player;
  currentPlayer: Player;
  dice: Record<string, number>[];
}

interface QuixxState {
  rounds: QuixxRound[];
  players: Player[];
}

export const initialState: QuixxState = {
  rounds: [],
  players: [],
};

export const quixxState = (state = initialState, action) => {
  switch (action.type) {
    case "updateQuixx":
      return { ...action.data };
    case "newGame":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const userReducer = (state = "", action) => {
  switch (action.type) {
    case "setUser":
      return action.name;
    case "newGame":
      return "";
    default:
      return state;
  }
};
