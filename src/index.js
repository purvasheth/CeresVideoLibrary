import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { PlaylistsProvider } from "./pages/Playlists/playlists-context";
import { VideoProvider } from "./pages/Videos/videos-context";
import { HistoryProvider } from "./pages/History/history-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <PlaylistsProvider>
      <VideoProvider>
        <HistoryProvider>
          <Router>
            <App />
          </Router>
        </HistoryProvider>
      </VideoProvider>
    </PlaylistsProvider>
  </StrictMode>,
  rootElement
);
