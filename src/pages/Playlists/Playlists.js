import { Fragment, useState } from "react";
import { usePlaylists } from "./playlists-context";
import { DELETE_PLAYLIST, EDIT_PLAYLIST_NAME } from "./playlists-reducer";
import { CloseButton } from "../../components/CloseButton";
import { BaseCard } from "../../components/BaseCard";
import { EditIcons } from "../../components/EditIcons";
import { useAxios } from "../../custom hooks/useAxios";
import { API_PLAYLISTS } from "../../urls";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useNavigate } from "react-router";

export function Playlists() {
  const { playlists } = usePlaylists();
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>All Playlists</h1>
      {playlists.map((playlist) => {
        const { _id, name, videos, defaultPlaylist } = playlist;
        return (
          <Fragment key={_id}>
            <PlaylistHeader
              name={name}
              _id={_id}
              defaultPlaylist={defaultPlaylist}
            />
            <div className="flex">
              {videos.length === 0 && (
                <p className="pl-sm">No videos added to this playlist</p>
              )}
              <PlaylistVideos videos={videos} _id={_id} />
            </div>
            {videos.length > 4 && (
              <button
                className="btn bg-primary mb-1 ml-1"
                onClick={() =>
                  navigate(`/playlists/${_id}`, { state: playlist })
                }
              >
                See All
              </button>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function PlaylistVideos({ videos, _id }) {
  return videos.slice(0, 4).map((video) => {
    return (
      <BaseCard key={video._id} {...video}>
        <CloseButton video={video} playlistId={_id} />
      </BaseCard>
    );
  });
}

function PlaylistHeader({ name, _id, defaultPlaylist }) {
  const [playlistName, setPlaylistName] = useState(name);
  const [isEditable, setIsEditable] = useState(false);
  const { playlistsDispatch } = usePlaylists();
  const { isLoading, updateData: updatePlaylistName } = useAxios(API_PLAYLISTS);
  const editPlaylistName = async () => {
    const success = await updatePlaylistName(_id, { name: playlistName });
    if (success) {
      playlistsDispatch({
        type: EDIT_PLAYLIST_NAME,
        playlistName,
        playlistId: _id,
      });
      setIsEditable(false);
    }
  };
  const resetPlaylistName = () => {
    setPlaylistName(name);
    setIsEditable(false);
  };
  return (
    <div className="playlist__header">
      <LoadingIndicator isLoading={isLoading} small>
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          onFocus={() => setIsEditable(true)}
          className={`input name--regular ${
            isEditable ? "name--editable" : ""
          }`}
          disabled={defaultPlaylist}
        />
      </LoadingIndicator>
      <div className="flex">
        {!defaultPlaylist &&
          (!isEditable ? (
            <DefaultIcons setIsEditable={setIsEditable} _id={_id} />
          ) : (
            <EditIcons onSave={editPlaylistName} onCancel={resetPlaylistName} />
          ))}
      </div>
    </div>
  );
}
function DefaultIcons({ setIsEditable, _id }) {
  const { playlistsDispatch } = usePlaylists();
  const { deleteData, isLoading } = useAxios(API_PLAYLISTS);
  const deletePlaylist = async () => {
    const success = await deleteData(_id);
    if (success) {
      playlistsDispatch({ type: DELETE_PLAYLIST, playlistId: _id });
    }
  };
  return (
    <>
      <button
        className="btn btn--icon font--primary playlist__icon"
        onClick={() => setIsEditable(true)}
      >
        <i className="fas fa-pen" />
      </button>
      <button
        className="btn btn--icon btn--warning playlist__icon"
        onClick={deletePlaylist}
      >
        <LoadingIndicator isLoading={isLoading} small>
          <i className="fas fa-trash-alt" />
        </LoadingIndicator>
      </button>
    </>
  );
}
