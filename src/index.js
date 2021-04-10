import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { PlaylistsProvider } from "./pages/playlists-context";
import { VideoProvider } from "./pages/videos-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <PlaylistsProvider>
      <VideoProvider>
        <Router>
          <App />
        </Router>
      </VideoProvider>
    </PlaylistsProvider>
  </StrictMode>,
  rootElement
);
