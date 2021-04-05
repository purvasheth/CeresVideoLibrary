export const initialPlaylists = [];

export const ADD_VIDEO_TO_PLAYLIST = "addVideoToPlaylist";
export const REMOVE_VIDEO_FROM_PLAYLIST = "removeVideofromPlaylist";
export const CREATE_PLAYLIST = "createPlaylist";
export const DELETE_PLAYLIST = "deletePlaylist";
export const EDIT_PLAYLIST_NAME = "editPlaylistName";

export const playlistsReducer = (
  { playlists },
  { type, playlist, playlistId, playlistName, videoId, video }
) => {
  switch (type) {
    case CREATE_PLAYLIST:
      return {
        playlists: playlists.concat(playlist),
      };
    case DELETE_PLAYLIST:
      return {
        playlists: playlists.filter((playlist) => playlist.id !== playlistId),
      };
    case ADD_VIDEO_TO_PLAYLIST:
      console.log({ video });
      return {
        playlists: playlists.map(({ id, videos, name }) =>
          id !== playlistId
            ? { id, videos, name }
            : { id, name, videos: videos.concat(video) }
        ),
      };
    case REMOVE_VIDEO_FROM_PLAYLIST:
      return {
        playlists: playlists.map(({ id, videos, name }) =>
          id !== playlistId
            ? { id, videos, name }
            : {
                id,
                name,
                videos: videos.filter(({ id }) => id !== videoId),
              }
        ),
      };
    case EDIT_PLAYLIST_NAME:
      return {
        playlists: playlists.map((playlist) =>
          playlist.id === playlistId
            ? { ...playlist, name: playlistName }
            : playlist
        ),
      };
    default:
      return { playlists };
  }
};
