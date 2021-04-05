import faker from "faker";
import { Modal } from "./Modal";
import { useState } from "react";
import {
  ADD_VIDEO_TO_PLAYLIST,
  CREATE_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "../pages/playlists-reducer";
import { usePlaylists } from "../pages/playlists-context";
import { isPresentInArray } from "../pages/VideoListing";

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
      {playlists.length !== 0 && "Add to"}
      <ul>
        {playlists.map(({ id: playlistId, ...rest }) => (
          <li key={playlistId}>
            <PlaylistCheckBox playlistId={playlistId} video={video} {...rest} />
          </li>
        ))}
      </ul>
    </>
  );
}
function PlaylistCheckBox({ playlistId, video, name, videos }) {
  const { playlistsDispatch } = usePlaylists();
  const [isInPlaylist, setIsInPlaylist] = useState(
    !!isPresentInArray(videos, video.id)
  );
  const updatePlaylist = ({ e, playlistId, video }) => {
    const { checked } = e.target;
    if (checked) {
      // TODO : add toast here
      // console.log("added", playlistId, videoId);
    } else {
      // TODO : add toast here
      // console.log("removed", playlistId, videoId);
    }
    checked
      ? playlistsDispatch({ type: ADD_VIDEO_TO_PLAYLIST, playlistId, video })
      : playlistsDispatch({
        type: REMOVE_VIDEO_FROM_PLAYLIST,
        playlistId,
        videoId: video.id,
      });
    setIsInPlaylist((prev) => !prev);
  };
  return (
    <label>
      <input
        type="checkbox"
        checked={isInPlaylist}
        onChange={(e) => updatePlaylist({ e, playlistId, video })}
      />
      {name}
    </label>
  );
}
function CreatePlaylist({ video, setShowSaveModal }) {
  const { playlistsDispatch } = usePlaylists();
  const [showNameInput, setShowNameInput] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const createNewPlaylist = ({ video, name }) => {
    playlistsDispatch({
      type: CREATE_PLAYLIST,
      playlist: {
        id: faker.datatype.uuid(),
        name,
        videos: [video],
      },
    });
    setShowSaveModal(false);
    setPlaylistName("");
  };
  return (
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
