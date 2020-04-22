import { createStore, combineReducers } from "redux";
import { quixxState, userReducer } from "./reducer";

// const socketURL = "ws://localhost:3001";
const socketURL = "wss://dlujlom9wh.execute-api.us-east-1.amazonaws.com/dev";

export const store = createStore(
  combineReducers({ stream: quixxState, user: userReducer })
);

const socket = new WebSocket(socketURL);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.players) {
    store.dispatch({ type: "updateQuixx", data });
  }
  console.log("onMessage", data);
};

export const addPlayer = (name: string) => {
  socket.send(JSON.stringify({ type: "addPlayer", name }));
};

export const newGame = () => {
  store.dispatch({ type: "newGame" });
  socket.send(JSON.stringify({ type: "newGame" }));
};

export const finishRound = () => {
  socket.send(JSON.stringify({ type: "finishRound" }));
};

export const nextRound = () => {
  socket.send(JSON.stringify({ type: "nextRound" }));
};

export const getCurrentRound = (state) => {
  const rounds = state.stream.rounds;
  return rounds[rounds.length - 1];
};
