import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
  // register service worker
  navigator.serviceWorker
    .register("/service-worker.js", { scope: "/" })
    .then(function (registration) {
      console.log("Service worker registered successfully");
    })
    .catch(function (e) {
      console.error("Error during service worker registration:", e);
    });
}
