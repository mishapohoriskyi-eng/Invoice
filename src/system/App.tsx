import React from "react";
import "../App.css";
import Router from "./Router";
import { GlobalCss } from "../utils/theme";
import { Provider } from "react-redux";
import store from "../state/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalCss />
        <Router />
      </Provider>
    </>
  );
}

export default App;
