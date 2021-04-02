import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { PlaylistsProvider } from "./pages/playlists-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <PlaylistsProvider>
      <App />
    </PlaylistsProvider>
  </StrictMode>,
  rootElement
);
