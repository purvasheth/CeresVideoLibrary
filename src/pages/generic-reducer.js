export const ADD_TO_GENERIC_ARRAY = "addToGenericArray";
export const ADD_TO_HISTORY_ARRAY = "addToHistoryArray";
export const REMOVE_FROM_GENERIC_ARRAY = "removefromGenericArray";

export const genericReducer = (
  state,
  { type, arrayName, video, timestamp }
) => {
  switch (type) {
    case ADD_TO_GENERIC_ARRAY:
      return {
        [arrayName]: state[arrayName].concat(video),
      };
    case REMOVE_FROM_GENERIC_ARRAY:
      return {
        [arrayName]: state[arrayName].filter(({ id }) => id !== video.id),
      };
    case ADD_TO_HISTORY_ARRAY:
      if (state[arrayName].find(({ id }) => id === video.id)) {
        return {
          [arrayName]: state[arrayName]
            .map((historyVideo) =>
              video.id === historyVideo.id
                ? { ...historyVideo, timestamp }
                : historyVideo
            )
            .sort((video1, video2) => [video2.timestamp - video1.timestamp]),
        };
      }
      return {
        [arrayName]: state[arrayName]
          .concat({ ...video, timestamp })
          .sort((video1, video2) => [video2.timestamp - video1.timestamp]),
      };
    default:
      return state;
  }
};
