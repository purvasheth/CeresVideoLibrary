import { useLocation } from "react-router";
import { getDefaultPlaylistArray } from "../utils";
import { usePlaylists } from "./Playlists/playlists-context";
import { VideoCard } from "./Videos/VideoListing";
import { useVideos } from "./Videos/videos-context";

const getSearchResults = (videos, searchString) =>
  videos.filter((item) =>
    item.name.toLowerCase().includes(searchString.toLowerCase())
  );

export function SearchResults() {
  const searchString = new URLSearchParams(useLocation().search).get(
    "searchString"
  );
  const { likedVideosId, watchLaterId, playlists } = usePlaylists();
  const { videos } = useVideos();
  const likedVideos = getDefaultPlaylistArray(playlists, likedVideosId);
  const watchLater = getDefaultPlaylistArray(playlists, watchLaterId);
  return (
    <div className="container">
      <h1>Search Results</h1>
      <div className="flex">
        {getSearchResults(videos, searchString).map(({ id, ...rest }) => (
          <VideoCard
            key={id}
            video={{ ...rest, id }}
            watchLater={watchLater}
            likedVideos={likedVideos}
          />
        ))}
        {getSearchResults(videos, searchString).length === 0 && (
          <div>No matching videos with that name found</div>
        )}
      </div>
    </div>
  );
}
