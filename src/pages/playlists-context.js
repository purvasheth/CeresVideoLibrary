import { createContext, useContext, useReducer } from "react";
import { playlistsReducer } from "./playlists-reducer";
import { genericReducer } from "./generic-reducer";

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
  const [{ history }, historyDispatch] = useReducer(genericReducer, {
    history: [],
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
        history,
        historyDispatch,
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => useContext(PlaylistsContext);
