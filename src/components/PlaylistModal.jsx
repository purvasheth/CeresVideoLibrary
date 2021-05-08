import { Modal } from "./Modal";
import { useState } from "react";
import { CREATE_PLAYLIST } from "../pages/Playlists/playlists-reducer";
import { usePlaylists } from "../pages/Playlists/playlists-context";
import { isPresentInArray } from "../utils";
import { useAxios } from "../custom hooks/useAxios";
import { API_PLAYLISTS } from "../urls";
import { LoadingIndicator } from "./LoadingIndicator";
import { useToggleVideo } from "../custom hooks/useToggleVideo";

export function PlaylistModal({ video, showSaveModal, setShowSaveModal }) {
  const [showNameInput, setShowNameInput] = useState(false);
  return (
    <Modal
      showModal={showSaveModal}
      onCloseClick={() => {
        setShowSaveModal(false);
        setShowNameInput(false);
      }}
    >
      <div className="w-250">
        <ExsistingPlaylistOptions video={video} />
        <CreatePlaylist
          video={video}
          setShowSaveModal={setShowSaveModal}
          showNameInput={showNameInput}
          setShowNameInput={setShowNameInput}
        />
      </div>
    </Modal>
  );
}
function ExsistingPlaylistOptions({ video }) {
  const { playlists } = usePlaylists();
  return (
    <>
      {playlists.filter((playlist) => !playlist.defaultPlaylist).length !==
        0 && <h3 className="playlist-modal__title">Save to</h3>}
      <ul className="list">
        {playlists
          .filter((playlist) => !playlist.defaultPlaylist)
          .map(({ _id: playlistId, ...rest }) => (
            <li className="list__item" key={playlistId}>
              <PlaylistCheckBox
                playlistId={playlistId}
                video={video}
                {...rest}
              />
            </li>
          ))}
      </ul>
      <hr />
    </>
  );
}
function PlaylistCheckBox({ playlistId, video, name, videos }) {
  const { isLoading, toggleVideoInPlaylist } = useToggleVideo({
    playlistId,
    video,
  });
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
          className="mr-1"
        />
      </LoadingIndicator>
      {name}
    </label>
  );
}
function CreatePlaylist({
  video,
  setShowSaveModal,
  showNameInput,
  setShowNameInput,
}) {
  const { playlistsDispatch } = usePlaylists();
  const { postData: createPlaylist, isLoading } = useAxios(API_PLAYLISTS);
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
        <CreatePlaylistButton setShowNameInput={setShowNameInput} />
        {showNameInput && (
          <div className="flex flex-col mt-1 ml-1">
            <label className="input-label">Name</label>
            <input
              className="input"
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <button
              className="btn bg-primary mt-2"
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

function CreatePlaylistButton({ setShowNameInput }) {
  return (
    <button
      className="btn icon--transparent btn-lg"
      onClick={() => {
        setShowNameInput(true);
      }}
    >
      <i className="fas fa-plus mr-sm"></i>
      Create New Playlist
    </button>
    // </label>
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
