import { combineReducers } from "redux";
import { useSelector, useDispatch } from "react-redux";

const lobby = (state = false, action) => {
  switch (action.type) {
    case "newGame":
      return false;
    case "setLobby":
      return action.lobby;
    default:
      return state;
  }
};
const user = (state = "", action) => {
  switch (action.type) {
    case "newGame":
      return "";
    case "updateUser":
      return action.name;
    default:
      return state;
  }
};

const players = (state = [], action) => {
  switch (action.type) {
    case "newGame":
      return [];
    case "setPlayers":
      return [...action.players];
    default:
      return state;
  }
};

const gameState = (state = [], action) => {
  switch (action.type) {
    case "newGame":
      return [];
    case "updateGameState":
      return [...action.gameState];
    default:
      return state;
  }
};

export const bingoReducers = {
  user,
  players,
  gameState,
  lobby,
};

export const getUser = (state) => state.user;
export const getPlayers = (state) => state.players;
export const getGameState = (state) => state.gameState;
export const getLobby = (state) => state.lobby;

let socket;
const API_URL =
  process.env.REACT_APP_API ||
  "wss://a2eqr0fgv1.execute-api.us-east-1.amazonaws.com/dev";
export const useLobby = () => {
  const dispatch = useDispatch();
  const isInLobby = useSelector(getLobby);
  const setLobby = (lobby) => dispatch({ type: "setLobby", lobby });
  const joinLobby = () => {
    socket = new WebSocket(API_URL);
    socket.onopen = () => {
      setLobby(true);
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("update socket event", data);
        if (data.type) {
          dispatch(data);
        }
      };
    };
  };
  return {
    isInLobby,
    joinLobby,
  };
};

export const usePlayerName = () => useSelector(getUser);
export const usePlayer = () => {
  const playerName = usePlayerName();
  const dispatch = useDispatch();
  const setPlayer = (name) => {
    socket.send(JSON.stringify({ type: "addBingoPlayer", name }));
    dispatch({ type: "updateUser", name });
  };
  return {
    playerName,
    setPlayer,
  };
};

export const useDraw = () => {
  const draw = () => {
    socket.send(JSON.stringify({ type: "draw" }));
  };
  const newGame = () => {
    socket.send(JSON.stringify({ type: "newGame" }));
  };
  const gameState = useSelector(getGameState);

  return {
    draw,
    newGame,
    gameState,
  };
};

export const usePlayers = () => useSelector(getPlayers);
