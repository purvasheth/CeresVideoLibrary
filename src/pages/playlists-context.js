import { createContext, useContext, useReducer } from "react";
import { playlistsReducer, initialPlaylists } from "./playlists-reducer";
import { genericReducer, initialGenericArray } from "./generic-reducer";

const PlaylistsContext = createContext({});

export const PlaylistsProvider = ({ children }) => {
  const [{ playlists }, playlistsDispatch] = useReducer(playlistsReducer, {
    playlists: [],
  });
  const [{ watchLater }, watchLaterDispatch] = useReducer(genericReducer, {
    watchLater: [],
  });
  const [{ likedVideos }, likedVideosDispatch] = useReducer(genericReducer, {
    likedVideos: [],
  });
  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        playlistsDispatch,
        watchLater,
        watchLaterDispatch,
        likedVideos,
        likedVideosDispatch,
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => useContext(PlaylistsContext);
