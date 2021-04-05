import "./styles.css";
import { VideoListing } from "./pages/VideoListing";
import { Playlists } from "./pages/Playlists";
import { GenericListing } from "./pages/GenericListing";
import { Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";

export default function App() {
  // const [routewithProps, setRouteWithProps] = useState({route:"videos",props:{}});
  // const {route,props} = routewithProps;
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

// <nav>
//   <ul>
//     <li class="inline">
//       <NavLink to="/" end activeClassName="selected">
//         Home
//       </NavLink>{" "}
//       |
//     </li>
//     <li class="inline">
//       <NavLink to="playlists" end activeClascbsName="selected">
//         Playlists
//       </NavLink>{" "}
//       |
//     </li>
//     <li class="inline">
//       <NavLink to="playlists/liked-videos" activeClassName="selected">
//         Liked Videos
//       </NavLink>{" "}
//       |
//     </li>
//     <li class="inline">
//       <NavLink to="playlists/watch-later" activeClassName="selected">
//         Watch Later
//       </NavLink>
//     </li>
//   </ul>
// </nav>
