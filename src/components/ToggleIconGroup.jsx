import { LoadingIndicator } from "./LoadingIndicator";
import { isPresentInArray } from "../utils";
import { useToggleVideo } from "../custom hooks/useToggleVideo";

export function ToggleIconGroup({ video, likedVideos, watchLater }) {
  const defaultPlaylist = { _id: "", videos: [] };
  return (
    <>
      <ToggleIcon playlist={likedVideos || defaultPlaylist} video={video} />
      <ToggleIcon playlist={watchLater || defaultPlaylist} video={video} />
    </>
  );
}
function ToggleIcon({ playlist, video }) {
  const { isLoading, toggleVideoInPlaylist } = useToggleVideo({
    playlistId: playlist._id,
    video,
  });

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
