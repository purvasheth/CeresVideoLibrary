import { useToggleVideo } from "../custom hooks/useToggleVideo";
import { LoadingIndicator } from "./LoadingIndicator";

export const CloseButton = ({ video, playlistId }) => {
  const { isLoading, toggleVideoInPlaylist } = useToggleVideo({
    video,
    playlistId,
  });
  return (
    <button
      className="btn-close btn--close--card btn-lg"
      onClick={() => toggleVideoInPlaylist(true)}
    >
      <LoadingIndicator isLoading={isLoading} small>
        <i className="fas fa-times" />
      </LoadingIndicator>
    </button>
  );
};
