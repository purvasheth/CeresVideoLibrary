export const ADD_TO_GENERIC_ARRAY = "addToGenericArray";
export const REMOVE_FROM_GENERIC_ARRAY = "removefromGenericArray";

export const genericReducer = (state, { type, arrayName, videoId, video }) => {
  switch (type) {
    case ADD_TO_GENERIC_ARRAY:
      return {
        [arrayName]: state[arrayName].concat(video),
      };
    case REMOVE_FROM_GENERIC_ARRAY:
      return {
        [arrayName]: state[arrayName].filter((video) => video !== videoId),
      };
    default:
      return state;
  }
};
