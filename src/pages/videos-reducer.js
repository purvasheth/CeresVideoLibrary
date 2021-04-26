export const UPDATE_NOTES = "updateNotes";
export const SET_VIDEOS = "setVideos";

export const videosReducer = (
  { videos },
  { type, videoId, finalNotes, fetchedVideos }
) => {
  switch (type) {
    case SET_VIDEOS:
      return { videos: fetchedVideos };
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
