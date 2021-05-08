import { createContext, useContext, useReducer } from "react";
import { playlistsReducer } from "./playlists-reducer";

const PlaylistsContext = createContext({});

export const PlaylistsProvider = ({ children }) => {
  const [
    { playlists, likedVideosId, watchLaterId },
    playlistsDispatch,
  ] = useReducer(playlistsReducer, {
    playlists: [],
    likedVideosId: "",
    watchLaterId: "",
  });
  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        playlistsDispatch,
        likedVideosId,
        watchLaterId,
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => useContext(PlaylistsContext);
