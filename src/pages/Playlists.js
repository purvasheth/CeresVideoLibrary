import { Fragment } from "react";
import { Thumbnail } from "../components/Thumbnail";
import { usePlaylists } from "./playlists-context";
import {
  DELETE_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "./playlists-reducer";
import { CloseButton } from "../components/CloseButton";

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
      <h1>Playlists</h1>
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
            {videos.map(({ name, avatarSrc, uploadedBy, id: videoId }) => {
              return (
                <div key={videoId} className="card card--shadow m-1">
                  <CloseButton
                    onClick={() => {
                      removeVideoFromPlaylist({ videoId, playlistId: id });
                    }}
                  />
                  <Thumbnail id={videoId} />
                  <div className="p-1">
                    <div className="flex flex-no-wrap">
                      <div
                        className="card__avatar"
                        style={{
                          backgroundImage: `url('${avatarSrc}')`,
                        }}
                      />
                      <div>
                        <div className="card__title">{name}</div>
                        <div className="mt-1">{uploadedBy}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {videos.length === 0 && "No videos added to this playlist"}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
