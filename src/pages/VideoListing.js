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
import {
  ADD_TO_GENERIC_ARRAY,
  REMOVE_FROM_GENERIC_ARRAY,
} from "./generic-reducer";
import { usePlaylists } from "./playlists-context";

export function VideoListing() {
  return (
    <div className="container">
      <h1>Video Listing</h1>
      <div className="flex">
        {data.map(({ id, ...rest }) => {
          return <Card key={id} id={id} {...rest} />;
        })}
      </div>
    </div>
  );
}

function Card(video) {
  const { id, avatarSrc, name, uploadedBy } = video;
  const {
    playlists,
    playlistsDispatch,
    watchLater,
    watchLaterDispatch,
    likedVideos,
    likedVideosDispatch,
  } = usePlaylists();
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
  const toggleGenericArray = ({ arrayName, video, array }) => {
    let type = ADD_TO_GENERIC_ARRAY;
    if (isPresentInArray(array, video.id)) type = REMOVE_FROM_GENERIC_ARRAY;
    const dispatchArgs = {
      type,
      arrayName,
      video,
    };
    arrayName === "likedVideos"
      ? likedVideosDispatch(dispatchArgs)
      : watchLaterDispatch(dispatchArgs);
  };
  const isPresentInArray = (array, id) =>
    array.find((video) => video.id === id);

  const getCardIconsClass = (array, id) => {
    if (isPresentInArray(array, id))
      return "btn btn--icon card__icon font--primary";
    return "btn btn--icon card__icon";
  };
  return (
    <div key={id} className="card card--shadow m-1">
      <Thumbnail id={id} />
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
            <div className="card__author">{uploadedBy}</div>
          </div>
        </div>
        <div className="flex justify-between align-baseline">
          <button
            className={getCardIconsClass(watchLater, id, "watchLater")}
            onClick={() =>
              toggleGenericArray({
                arrayName: "watchLater",
                array: watchLater,
                video,
              })
            }
          >
            <i className="fas fa-clock" />
          </button>
          <button
            className={getCardIconsClass(likedVideos, id, "likedVideos")}
            onClick={() =>
              toggleGenericArray({
                arrayName: "likedVideos",
                array: likedVideos,
                video,
              })
            }
          >
            <i className="fas fa-thumbs-up" />
          </button>
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
                    video={video}
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
                  className="btn bg-primary mt-1 mr-1"
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
