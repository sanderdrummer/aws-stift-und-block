import React from "react";
import { Provider } from "react-redux";

import { store } from "./store";
import { QuixxBlock } from "./quixx-game";

export const QuixxPage = () => {
  return (
    <Provider store={store}>
      <QuixxBlock />
    </Provider>
  );
};
