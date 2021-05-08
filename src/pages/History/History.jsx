import { BaseCard } from "../../components/BaseCard";
import { useEffect } from "react";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useHistory } from "./history-context";
import { REMOVE_FROM_HISTORY, SET_HISTORY } from "./history-reducer";
import { useAxios } from "../../custom hooks/useAxios";
import { API_HISTORY } from "../../urls";
import { successToast } from "../../components/toasts";

export function History() {
  const { history, historyDispatch } = useHistory();
  const { isLoading, getData: getHistory, deleteData: deleteVideo } = useAxios(
    API_HISTORY
  );

  useEffect(() => {
    if (history.length === 0) {
      (async () => {
        const fetchedVideos = await getHistory();
        historyDispatch({ type: SET_HISTORY, fetchedVideos });
      })();
    }
  }, []);

  const removeVideo = async (videoId) => {
    const success = await deleteVideo(videoId);
    if (success) {
      historyDispatch({ type: REMOVE_FROM_HISTORY, videoId });
      successToast("Removed video from history");
    }
  };

  return (
    <div className="container">
      <h1>Your History</h1>
      <LoadingIndicator isLoading={isLoading}>
        <div className="flex">
          {history
            .sort(
              (video1, video2) =>
                new Date(video2.timestamp) - new Date(video1.timestamp)
            )
            .map((video) => {
              return (
                <BaseCard key={video._id} {...video}>
                  <button
                    className="btn-close btn--close--card btn-lg"
                    onClick={() => removeVideo(video._id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                </BaseCard>
              );
            })}
          {history.length === 0 && <div>No videos in history</div>}
        </div>
      </LoadingIndicator>
    </div>
  );
}
