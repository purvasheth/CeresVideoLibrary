import { Fragment, useState } from "react";
import { usePlaylists } from "./playlists-context";
import {
  DELETE_PLAYLIST,
  EDIT_PLAYLIST_NAME,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "./playlists-reducer";
import { CloseButton } from "../components/CloseButton";
import { BaseCard } from "../components/BaseCard";

export function Playlists() {
  const { playlists } = usePlaylists();
  return (
    <div className="container">
      <h1>My Playlists</h1>
      {playlists.map(({ id, name, videos }) => (
        <Fragment key={id}>
          <PlaylistHeader name={name} id={id} />
          <div className="flex">
            {videos.length === 0 && "No videos added to this playlist"}
            <PlaylistVideos videos={videos} id={id} />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function PlaylistVideos({ videos, id }) {
  const { playlistsDispatch } = usePlaylists();
  const removeVideoFromPlaylist = ({ videoId, playlistId }) => {
    playlistsDispatch({
      type: REMOVE_VIDEO_FROM_PLAYLIST,
      videoId,
      playlistId,
    });
  };
  return videos.map(({ id: videoId, ...rest }) => {
    return (
      <BaseCard key={videoId} id={videoId} {...rest}>
        <CloseButton
          onClick={() => {
            removeVideoFromPlaylist({ videoId, playlistId: id });
          }}
        />
      </BaseCard>
    );
  });
}

function PlaylistHeader({ name, id }) {
  const [playlistName, setPlaylistName] = useState(name);
  const [isEditable, setIsEditable] = useState(false);
  const resetPlaylistName = () => {
    setPlaylistName(name);
    setIsEditable(false);
  };
  return (
    <div className="playlist__header">
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        onFocus={() => setIsEditable(true)}
        className={`input name--regular ${isEditable ? "name--editable" : ""}`}
      />
      <div className="flex">
        {!isEditable ? (
          <DefaultIcons setIsEditable={setIsEditable} id={id} />
        ) : (
          <EditIcons
            setIsEditable={setIsEditable}
            id={id}
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            resetPlaylistName={resetPlaylistName}
          />
        )}
      </div>
    </div>
  );
}
function EditIcons({ setIsEditable, id, playlistName, resetPlaylistName }) {
  const { playlistsDispatch } = usePlaylists();
  const editPlaylistName = () => {
    playlistsDispatch({
      type: EDIT_PLAYLIST_NAME,
      playlistName,
      playlistId: id,
    });
    setIsEditable(false);
  };

  return (
    <>
      <button
        class="btn btn--icon btn--success playlist__icon"
        onClick={editPlaylistName}
      >
        <i class="fas fa-check"></i>
      </button>
      <button
        class="btn btn--icon btn--warning playlist__icon"
        onClick={resetPlaylistName}
      >
        <i class="fas fa-times"></i>
      </button>
    </>
  );
}

function DefaultIcons({ setIsEditable, id }) {
  const { playlistsDispatch } = usePlaylists();
  const deletePlaylist = () => {
    playlistsDispatch({ type: DELETE_PLAYLIST, playlistId: id });
  };
  return (
    <>
      <button
        className="btn btn--icon font--primary playlist__icon"
        onClick={() => setIsEditable(true)}
      >
        <i class="fas fa-pen" />
      </button>
      <button
        className="btn btn--icon btn--warning playlist__icon"
        onClick={deletePlaylist}
      >
        <i class="fas fa-trash-alt" />
      </button>
    </>
  );
}
