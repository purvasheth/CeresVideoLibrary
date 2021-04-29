export const initialPlaylists = [];
export const SET_PLAYLISTS = "setPlaylists";
export const ADD_VIDEO_TO_PLAYLIST = "addVideoToPlaylist";
export const REMOVE_VIDEO_FROM_PLAYLIST = "removeVideofromPlaylist";
export const CREATE_PLAYLIST = "createPlaylist";
export const DELETE_PLAYLIST = "deletePlaylist";
export const EDIT_PLAYLIST_NAME = "editPlaylistName";
export const SET_LIKED_VIDEOS_ID = "setLikedVideosId";
export const SET_WATCH_LATER_ID = "setWatchLaterId";

export const playlistsReducer = (
  state,
  { type, playlist, playlistId, playlistName, videoId, video, fetchedPlaylists }
) => {
  const { playlists } = state;
  switch (type) {
    case SET_PLAYLISTS:
      return { ...state, playlists: fetchedPlaylists };
    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: playlists.concat(playlist),
      };
    case DELETE_PLAYLIST:
      return {
        ...state,
        playlists: playlists.filter((playlist) => playlist._id !== playlistId),
      };
    case ADD_VIDEO_TO_PLAYLIST:
      return {
        ...state,
        playlists: playlists.map((playlist) =>
          playlist._id !== playlistId
            ? playlist
            : { ...playlist, videos: playlist.videos.concat(video) }
        ),
      };
    case REMOVE_VIDEO_FROM_PLAYLIST:
      return {
        ...state,
        playlists: playlists.map((playlist) => {
          return playlist._id !== playlistId
            ? playlist
            : {
                ...playlist,
                videos: playlist.videos.filter(({ _id }) => _id !== videoId),
              };
        }),
      };
    case EDIT_PLAYLIST_NAME:
      return {
        ...state,
        playlists: playlists.map((playlist) =>
          playlist._id === playlistId
            ? { ...playlist, name: playlistName }
            : playlist
        ),
      };
    case SET_LIKED_VIDEOS_ID:
      return {
        ...state,
        likedVideosId: playlistId,
      };
    case SET_WATCH_LATER_ID:
      return {
        ...state,
        watchLaterId: playlistId,
      };

    default:
      return state;
  }
};
