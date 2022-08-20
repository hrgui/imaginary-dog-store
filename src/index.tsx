import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { worker } from "./mocks/browser";

async function bootstrap() {
  //TODO: pathname is naive - it doesn't work but github pages will 404 upon reload
  await worker.start({
    serviceWorker: {
      url: import.meta.env.PROD
        ? window.location.pathname + "/mockServiceWorker.js"
        : "/mockServiceWorker.js",
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
