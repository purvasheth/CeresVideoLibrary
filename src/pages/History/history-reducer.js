export const SET_HISTORY = "setHistory";
export const ADD_TO_HISTORY = "addToHistoryArray";
export const REMOVE_FROM_HISTORY = "removefromGenericArray";
export const UPDATE_TIMESTAMP = "updateTimestamp";

export const historyReducer = (
  { history },
  { type, historyVideo, fetchedVideos, videoId, timestamp }
) => {
  switch (type) {
    case SET_HISTORY:
      return {
        history: fetchedVideos,
      };
    case ADD_TO_HISTORY:
      return {
        history: history.concat(historyVideo),
      };
    case REMOVE_FROM_HISTORY:
      return {
        history: history.filter(({ _id }) => _id !== videoId),
      };
    case UPDATE_TIMESTAMP:
      return {
        history: history.map((video) =>
          video._id === videoId ? { ...video, timestamp } : video
        ),
      };

    default:
      return { history };
  }
};
