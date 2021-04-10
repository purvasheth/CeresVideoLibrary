import { useState } from "react";
import {
  ADD_TO_GENERIC_ARRAY,
  REMOVE_FROM_GENERIC_ARRAY,
} from "./generic-reducer";
import { usePlaylists } from "./playlists-context";
import { BaseCard } from "../components/BaseCard";
import { SaveModalButton, PlaylistModal } from "../components/PlaylistModal";
import { useVideos } from "./videos-context";

export const isPresentInArray = (array, id) =>
  array.find((video) => video.id === id);

export function VideoListing() {
  const { videos } = useVideos();
  return (
    <div className="container">
      <h1>Video Listing</h1>
      <div className="flex">
        {videos.map(({ id, ...rest }) => {
          return <VideoCard key={id} id={id} {...rest} />;
        })}
      </div>
    </div>
  );
}

function VideoCard(video) {
  const [showSaveModal, setShowSaveModal] = useState(false);

  return (
    <BaseCard {...video}>
      <VideoCardFooter>
        <ToggleIconGroup video={video} />
        <SaveModalButton setShowSaveModal={setShowSaveModal} />
      </VideoCardFooter>
      <PlaylistModal
        video={video}
        setShowSaveModal={setShowSaveModal}
        showSaveModal={showSaveModal}
      />
    </BaseCard>
  );
}

export function VideoCardFooter({ children }) {
  return <div className="flex align-center pb-1 pl-1 pr-1">{children}</div>;
}

export function ToggleIconGroup({ video }) {
  const { watchLater, likedVideos } = usePlaylists();
  return (
    <>
      <ToggleIcon array={likedVideos} arrayName="likedVideos" video={video} />
      <ToggleIcon array={watchLater} arrayName="watchLater" video={video} />
    </>
  );
}

export function ToggleIcon({ array, arrayName, video }) {
  const { watchLaterDispatch, likedVideosDispatch } = usePlaylists();

  const getCardIconsClass = (array, id) => {
    if (isPresentInArray(array, id))
      return "btn btn--icon card__icon font--primary";
    return "btn btn--icon card__icon";
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

  return (
    <button
      className={getCardIconsClass(array, video.id)}
      onClick={() =>
        toggleGenericArray({
          arrayName,
          array,
          video,
        })
      }
    >
      {arrayName === "likedVideos" ? (
        <i className="fas fa-thumbs-up" />
      ) : (
        <i className="fas fa-clock" />
      )}
    </button>
  );
}
