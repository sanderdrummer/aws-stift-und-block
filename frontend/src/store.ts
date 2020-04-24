import { createStore, combineReducers } from "redux";

import { quixxState, userReducer } from "./quixx/store/reducer";
import { bingoReducers } from "./bingo/store";

export const store = createStore(
  combineReducers({ stream: quixxState, user: userReducer, ...bingoReducers })
);
