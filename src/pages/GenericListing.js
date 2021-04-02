import { data } from "../data";
import faker from "faker";
import { Modal } from "../components/Modal";
import { Thumbnail } from "../components/Thumbnail";
import { useState } from "react";
import {
  ADD_VIDEO_TO_PLAYLIST,
  CREATE_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "./playlists-reducer";
import { usePlaylists } from "./playlists-context";
import { genericReducer } from "./generic-reducer";

// shamelessly copied from
// https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-sentence-case-text
const camel2title = (camelCase) =>
  camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

export function GenericListing({ listingName }) {
  console.log(listingName);
  const {
    [listingName]: genericArray,
    [`${listingName}Dispatch`]: genericDispatch,
  } = usePlaylists();
  return (
    <div className="container">
      <h1>{camel2title(listingName)}</h1>
      <div className="flex">
        {genericArray.map(({ id, ...rest }) => {
          return <Card key={id} id={id} {...rest} />;
        })}
      </div>
    </div>
  );
}

function Card({ id, avatarSrc, name, uploadedBy }) {
  const { playlists, playlistsDispatch } = usePlaylists();
  const [showSaveModal, setShowSaveModal] = useState(false);
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
    <div key={id} className="card flex flex-column card--shadow m-1">
      <Thumbnail id={id} />
      <div className="p-1 flex-grow flex">
        <div className="flex flex-no-wrap flex-grow">
          <div
            className="card__avatar"
            style={{
              backgroundImage: `url('${avatarSrc}')`,
            }}
          />
          <div className="flex flex-column">
            <div className="flex-grow">
              <div className="card__title">{name}</div>
              <div className="mt-1">{uploadedBy}</div>
            </div>
            <button
              className="btn bg-primary mt-1"
              onClick={() => setShowSaveModal(true)}
            >
              Save to Playlist
            </button>
          </div>
          <Modal
            showModal={showSaveModal}
            onCloseClick={() => {
              setShowSaveModal(false);
            }}
          >
            <div className="w-250">
              {playlists.length !== 0 && "Add to"}
              <ul>
                {playlists.map(({ id: playlistId, ...rest }) => (
                  <li key={playlistId}>
                    <PlaylistCheckBox
                      playlistId={playlistId}
                      video={{ id, name, avatarSrc, uploadedBy }}
                      {...rest}
                    />
                  </li>
                ))}
              </ul>
              <label>
                <input
                  type="checkbox"
                  checked={showNameInput}
                  onChange={() => setShowNameInput((prev) => !prev)}
                />
                Create New Playlist
              </label>
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
                    className="btn bg-primary mt-1 mr-1 align-end"
                    onClick={() =>
                      createNewPlaylist({
                        name: playlistName,
                        video: { id, name, avatarSrc, uploadedBy },
                      })
                    }
                  >
                    Create
                  </button>
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

function PlaylistCheckBox({ playlistId, video, name, videos }) {
  const { playlistsDispatch } = usePlaylists();
  const [isInPlaylist, setIsInPlaylist] = useState(
    !!videos.find(({ id }) => id === video.id)
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
