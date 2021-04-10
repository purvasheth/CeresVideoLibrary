export const UPDATE_NOTES = "updateNotes";

export const videosReducer = ({ videos }, { type, videoId, finalNotes }) => {
  switch (type) {
    case UPDATE_NOTES:
      return {
        videos: videos.map((video) =>
          video.id === videoId ? { ...video, finalNotes } : video
        ),
      };
    default:
      return { videos };
  }
};
