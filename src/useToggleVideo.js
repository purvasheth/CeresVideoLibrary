import { successToast } from "./components/toasts";
import { usePlaylists } from "./pages/playlists-context";
import {
  ADD_VIDEO_TO_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "./pages/playlists-reducer";
import { API_PLAYLISTS } from "./urls";
import { useAxios } from "./useAxios";

export function useToggleVideo({ playlistId, video }) {
  const { playlistsDispatch } = usePlaylists();
  const {
    updateData: addVideoToPlaylist,
    deleteData: removeVideoFromPlaylist,
    isLoading,
  } = useAxios(`${API_PLAYLISTS}/${playlistId}`);
  const toggleVideoInPlaylist = async (isPresent) => {
    if (!isPresent) {
      const success = await addVideoToPlaylist(video._id, {});
      if (success) {
        successToast(`Added video to playlist`);
        playlistsDispatch({
          type: ADD_VIDEO_TO_PLAYLIST,
          video,
          playlistId,
        });
      }
    } else {
      const success = await removeVideoFromPlaylist(video._id);
      if (success) {
        successToast(`Removed video from playlist`);
        playlistsDispatch({
          type: REMOVE_VIDEO_FROM_PLAYLIST,
          videoId: video._id,
          playlistId,
        });
      }
    }
  };
  return {
    isLoading,
    toggleVideoInPlaylist,
  };
}
