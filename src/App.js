import "./styles.css";
import { VideoListing } from "./pages/Videos/VideoListing";
import { Playlists } from "./pages/Playlists/Playlists";
import { PlaylistDetail } from "./pages/Playlists/PlaylistDetail";
import { Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { VideoDetail } from "./pages/Videos/VideoDetail";
import { PageNotFound } from "./pages/PageNotFound";
import { History } from "./pages/History/History";
import { SearchResults } from "./pages/SearchResults";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div>
      <ToastContainer />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<VideoListing />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:playlistId" element={<PlaylistDetail />} />
        <Route path="/video/:videoId" element={<VideoDetail />} />
        <Route path="/history" element={<History />} />
        <Route path="/search" element={<SearchResults />} />s
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
