import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { worker } from "./mocks/browser";

async function bootstrap() {
  await worker.start({
    onUnhandledRequest: "warn",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

bootstrap();
