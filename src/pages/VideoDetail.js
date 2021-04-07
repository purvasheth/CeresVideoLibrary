import { useParams } from "react-router";
import { Iframe } from "../components/Iframe";
import { data } from "../data";
import { isPresentInArray, ToggleIconGroup } from "./VideoListing";
import { Avatar } from "../components/BaseCard";
import { SaveModalButton, PlaylistModal } from "../components/PlaylistModal";
import { useEffect, useState } from "react";
import { usePlaylists } from "./playlists-context";
import { ADD_TO_HISTORY_ARRAY } from "./generic-reducer";

export function VideoDetail() {
  const { videoId } = useParams();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { historyDispatch } = usePlaylists();
  // TODO: [BE] - useEffect for this video info
  // not adding a check for undefined as this code will be refactored once backend comes in.
  const video = isPresentInArray(data, videoId);
  const { name, uploadedBy, avatarSrc } = video;

  useEffect(() => {
    historyDispatch({
      type: ADD_TO_HISTORY_ARRAY,
      arrayName: "history",
      video,
      timestamp: new Date(),
    });
  }, []);

  return (
    <div className="container--video">
      <Iframe id={videoId} />
      <div>
        <div className="flex">
          <h3 className="video__title">{name}</h3>
          <div className="video__info">
            <div className="flex p-1 align-center justify-center flex-grow">
              <ToggleIconGroup video={video} />
              <SaveModalButton setShowSaveModal={setShowSaveModal} />
            </div>
            <div className="p-1 flex align-center flex-no-wrap flex-grow justify-center ">
              <Avatar avatarSrc={avatarSrc} />
              <div>{uploadedBy}</div>
            </div>
          </div>
          <PlaylistModal
            video={video}
            setShowSaveModal={setShowSaveModal}
            showSaveModal={showSaveModal}
          />
        </div>
      </div>
    </div>
  );
}
