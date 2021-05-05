import { createContext, useContext, useReducer } from "react";
import { videosReducer } from "./videos-reducer";

const VideosContext = createContext({});

export const VideoProvider = ({ children }) => {
  const [{ videos }, videosDispatch] = useReducer(videosReducer, {
    videos: [],
  });

  return (
    <VideosContext.Provider
      value={{
        videos,
        videosDispatch,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = () => useContext(VideosContext);
