import "./styles.css";
import { VideoListing } from "./pages/VideoListing";
import { Playlists } from "./pages/Playlists";
import { GenericListing } from "./pages/GenericListing";
import { Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";

export default function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<VideoListing />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:playlistName" element={<GenericListing />} />
      </Routes>
    </div>
  );
}
