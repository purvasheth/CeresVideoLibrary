import { Fragment } from "react";
import { usePlaylists } from "./playlists-context";
import {
  DELETE_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "./playlists-reducer";
import { CloseButton } from "../components/CloseButton";
import { BaseCard } from "../components/BaseCard";

// TODO: more refactoring + edit name and delete with icons and modal
export function Playlists() {
  const { playlists, playlistsDispatch } = usePlaylists();
  const deletePlaylist = (id) => {
    playlistsDispatch({ type: DELETE_PLAYLIST, playlistId: id });
  };
  const removeVideoFromPlaylist = ({ videoId, playlistId }) => {
    playlistsDispatch({
      type: REMOVE_VIDEO_FROM_PLAYLIST,
      videoId,
      playlistId,
    });
  };
  return (
    <div className="container">
      <h1>My Playlists</h1>
      {playlists.map(({ id, name, videos }) => (
        <Fragment key={id}>
          <div className="flex justify-between align-center">
            <h2>{name}</h2>
            <button
              className="btn bg-red-600"
              onClick={() => deletePlaylist(id)}
            >
              Delete Playlist
            </button>
          </div>
          <div className="flex">
            {videos.map(({ id: videoId, ...rest }) => {
              return (
                <BaseCard id={videoId} {...rest}>
                  <CloseButton
                    onClick={() => {
                      removeVideoFromPlaylist({ videoId, playlistId: id });
                    }}
                  />
                </BaseCard>
              );
            })}
            {videos.length === 0 && "No videos added to this playlist"}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
