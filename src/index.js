import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { PlaylistsProvider } from "./pages/playlists-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <PlaylistsProvider>
      <Router>
        <App />
      </Router>
    </PlaylistsProvider>
  </StrictMode>,
  rootElement
);
