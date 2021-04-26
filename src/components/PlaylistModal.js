import faker from "faker";
import { Modal } from "./Modal";
import { useState } from "react";
import {
  ADD_VIDEO_TO_PLAYLIST,
  CREATE_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "../pages/playlists-reducer";
import { usePlaylists } from "../pages/playlists-context";
import { isPresentInArray } from "../utils";
import { useAxios } from "../useAxios";
import { API_PLAYLISTS } from "../urls";
import { LoadingIndicator } from "./LoadingIndicator";
import { useToggleVideo } from "../useToggleVideo";

// TODO: add better styling for this modal
export function PlaylistModal({ video, showSaveModal, setShowSaveModal }) {
  return (
    <Modal
      showModal={showSaveModal}
      onCloseClick={() => setShowSaveModal(false)}
    >
      <div className="w-250">
        <ExsistingPlaylistOptions video={video} />
        <CreatePlaylist video={video} setShowSaveModal={setShowSaveModal} />
      </div>
    </Modal>
  );
}
function ExsistingPlaylistOptions({ video }) {
  const { playlists } = usePlaylists();
  return (
    <>
      {playlists.filter((playlist) => !playlist.defaultPlaylist).length !== 0 &&
        "Add to"}
      <ul>
        {playlists
          .filter((playlist) => !playlist.defaultPlaylist)
          .map(({ _id: playlistId, ...rest }) => (
            <li key={playlistId}>
              <PlaylistCheckBox
                playlistId={playlistId}
                video={video}
                {...rest}
              />
            </li>
          ))}
      </ul>
    </>
  );
}
function PlaylistCheckBox({ playlistId, video, name, videos }) {
  const { isLoading, toggleVideoInPlaylist } = useToggleVideo(
    playlistId,
    video
  );
  const [isInPlaylist, setIsInPlaylist] = useState(
    !!isPresentInArray(videos, video._id)
  );
  const updatePlaylist = (e) => {
    const { checked } = e.target;
    toggleVideoInPlaylist(!checked);
    setIsInPlaylist((prev) => !prev);
  };
  return (
    <label>
      <LoadingIndicator small isLoading={isLoading}>
        <input
          type="checkbox"
          checked={isInPlaylist}
          onChange={(e) => updatePlaylist(e)}
        />
      </LoadingIndicator>
      {name}
    </label>
  );
}
function CreatePlaylist({ video, setShowSaveModal }) {
  const { playlistsDispatch } = usePlaylists();
  const { postData: createPlaylist, isLoading } = useAxios(API_PLAYLISTS);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const createNewPlaylist = async ({ video, name }) => {
    const playlist = await createPlaylist({
      name,
      videos: [video._id],
    });
    playlistsDispatch({
      type: CREATE_PLAYLIST,
      playlist: {
        _id: playlist._id,
        name,
        videos: [video],
      },
    });
    setShowSaveModal(false);
    setPlaylistName("");
  };
  return (
    <LoadingIndicator isLoading={isLoading}>
      <>
        <ToggleCreatePlaylistLabel
          showNameInput={showNameInput}
          setShowNameInput={setShowNameInput}
        />
        {showNameInput && (
          <div className="flex flex-col mt-1">
            <label className="input-label">Name</label>
            <input
              className="input"
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <button
              className="btn bg-primary mt-1 mr-1"
              onClick={() => createNewPlaylist({ name: playlistName, video })}
            >
              Create
            </button>
          </div>
        )}
      </>
    </LoadingIndicator>
  );
}
function ToggleCreatePlaylistLabel({ showNameInput, setShowNameInput }) {
  return (
    <label>
      <input
        type="checkbox"
        checked={showNameInput}
        onChange={() => setShowNameInput((prev) => !prev)}
      />
      Create New Playlist
    </label>
  );
}
export function SaveModalButton({ setShowSaveModal }) {
  return (
    <button
      className="btn bg-primary ml-1"
      onClick={() => setShowSaveModal(true)}
    >
      SAVE
    </button>
  );
}
