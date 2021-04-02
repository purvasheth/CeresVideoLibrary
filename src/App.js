import { useState } from "react";
import "./styles.css";
import { VideoListing } from "./pages/VideoListing";
import { Playlists } from "./pages/Playlists";
import { GenericListing } from "./pages/GenericListing";

export default function App() {
  const [routewithProps, setRouteWithProps] = useState({route:"videos",props:{}});
  const {route,props} = routewithProps;
  return (
    <div>
      <div className="flex flex--center mt-1">
        <button
          className={`btn ${
            route === "videos" ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() =>  setRouteWithProps({route:"videos"})}
        >
          Video Listing
        </button>
        <button
          className={`btn ml-1 ${
            route === "playlists" ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setRouteWithProps({route:"playlists"})}
        >
          Playlists
        </button>
        <button
          className={`btn ml-1 ${
            route === "watchLater" ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setRouteWithProps({route:"watchLater",props:{listingName:"watchLater"}})}
        >
          Watch Later
        </button>
        <button
          className={`btn ml-1 ${
            route === "likedVideos" ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setRouteWithProps({route:"likedVideos",props:{listingName:"likedVideos"}})}
        >
          Liked Videos
        </button>
      </div>
      {route === "videos" && <VideoListing />}
      {route === "playlists" && <Playlists />}
      {route === "watchLater" && <GenericListing {...props} />}
      {route === "likedVideos" && <GenericListing {...props} />}
    </div>
  );
}


