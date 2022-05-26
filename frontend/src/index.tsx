import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import "./App.css";
import Wallet from "./Wallet";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { ConnectContext, connector } from "./store/connector";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Tweets from "./Tweets";

const renderApp = () =>
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <Provider store={store}>
        <ConnectContext.Provider value={connector}>
          <Routes>
            <Route path="/" element={<Wallet />} />
            <Route path="tweets" element={<Tweets />} />
            <Route path="wallet" element={<Wallet />} />
          </Routes>
        </ConnectContext.Provider>
      </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root"),
  );

if (process.env.NODE_ENV !== "production" && (module as any).hot) {
  (module as any).hot.accept("./Wallet", renderApp);
}

renderApp();

reportWebVitals();
