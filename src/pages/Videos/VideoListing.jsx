import { useState } from "react";
import { usePlaylists } from "../Playlists/playlists-context";
import { useVideos } from "./videos-context";
import { categories } from "../../data";
import { getDefaultPlaylistArray } from "../../utils";
import { VideoCard } from "../../components/VideoCard";

export function VideoListing() {
  const { likedVideosId, watchLaterId, playlists } = usePlaylists();
  const { videos } = useVideos();
  const likedVideos = getDefaultPlaylistArray(playlists, likedVideosId);
  const watchLater = getDefaultPlaylistArray(playlists, watchLaterId);
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <div className="container">
      <h1>Video Listing</h1>
      <div className="flex">
        {categories.map(({ name, id }) => (
          <CategoryBadge
            key={id}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            category={name}
          />
        ))}
      </div>
      <div className="flex">
        {videos
          .filter(
            ({ category }) =>
              activeCategory === "All" || activeCategory === category
          )
          .map(({ id, ...rest }) => {
            return (
              <VideoCard
                key={id}
                video={{ ...rest, id }}
                watchLater={watchLater}
                likedVideos={likedVideos}
              />
            );
          })}
      </div>
    </div>
  );
}

function CategoryBadge({ activeCategory, setActiveCategory, category }) {
  return (
    <span
      className={`badge--regular m-1 clickable ${
        activeCategory === category ? "bg-primary" : "bg-primary-200"
      }`}
      onClick={() => setActiveCategory(category)}
    >
      {category}
    </span>
  );
}
