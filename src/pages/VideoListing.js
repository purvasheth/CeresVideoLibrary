import { useState } from "react";
import { usePlaylists } from "./playlists-context";
import { BaseCard } from "../components/BaseCard";
import { SaveModalButton, PlaylistModal } from "../components/PlaylistModal";
import { useVideos } from "./videos-context";
import { categories } from "../data";
import { useAxios } from "../useAxios";
import { API_PLAYLISTS } from "../urls";
import { LoadingIndicator } from "../components/LoadingIndicator";
import {
  ADD_VIDEO_TO_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "./playlists-reducer";
import { getDefaultPlaylistArray, isPresentInArray } from "../utils";
import { useToggleVideo } from "../useToggleVideo";

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

function VideoCard({ video, watchLater, likedVideos }) {
  const [showSaveModal, setShowSaveModal] = useState(false);

  return (
    <BaseCard {...video}>
      <VideoCardFooter>
        <ToggleIconGroup
          video={video}
          watchLater={watchLater}
          likedVideos={likedVideos}
        />
        <SaveModalButton setShowSaveModal={setShowSaveModal} />
      </VideoCardFooter>
      <PlaylistModal
        video={video}
        setShowSaveModal={setShowSaveModal}
        showSaveModal={showSaveModal}
      />
    </BaseCard>
  );
}

export function VideoCardFooter({ children }) {
  return <div className="flex align-center pb-1 pl-1 pr-1">{children}</div>;
}

const defaultPlaylist = { _id: "", videos: [] };

export function ToggleIconGroup({ video, likedVideos, watchLater }) {
  return (
    <>
      <ToggleIcon playlist={likedVideos || defaultPlaylist} video={video} />
      <ToggleIcon playlist={watchLater || defaultPlaylist} video={video} />
    </>
  );
}

export function ToggleIcon({ playlist, video }) {
  const { isLoading, toggleVideoInPlaylist } = useToggleVideo(
    playlist._id,
    video
  );

  const getCardIconsClass = (id) => {
    if (isPresentInArray(playlist.videos, id))
      return "btn btn--icon card__icon font--primary";
    return "btn btn--icon card__icon";
  };

  return (
    <button
      className={getCardIconsClass(video._id)}
      disabled={isLoading}
      onClick={() =>
        toggleVideoInPlaylist(isPresentInArray(playlist.videos, video._id))
      }
    >
      <LoadingIndicator isLoading={isLoading} small>
        {playlist.name === "Liked Videos" ? (
          <i className="fas fa-thumbs-up" />
        ) : (
          <i className="fas fa-clock" />
        )}
      </LoadingIndicator>
    </button>
  );
}
