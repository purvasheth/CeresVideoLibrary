import { createContext, useContext, useReducer } from "react";
import { data } from "../data";
import { videosReducer } from "./videos-reducer";

const VideosContext = createContext({});

export const VideoProvider = ({ children }) => {
  const [{ videos }, videosDispatch] = useReducer(videosReducer, {
    videos: data,
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
