import { useState } from "react";
import { usePlaylists } from "./playlists-context";
import { BaseCard } from "../components/BaseCard";
import { PlaylistModal, SaveModalButton } from "../components/PlaylistModal";
import { CloseButton } from "../components/CloseButton";
import { REMOVE_FROM_GENERIC_ARRAY } from "./generic-reducer";
import { useParams } from "react-router";

const transformText = ({ type, text }) => {
  console.clear();
  console.log(text);
  const textArray = text
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1));

  switch (type) {
    case "camelCase":
      const camelCase = textArray.join("");
      return camelCase[0].toLowerCase() + camelCase.slice(1);
    case "titleCase":
      return textArray.join(" ");
    default:
      return textArray.join("");
  }
};

export function GenericListing() {
  const { playlistName } = useParams();
  const {
    [transformText({ type: "camelCase", text: playlistName })]: genericArray,
    [`${transformText({
      type: "camelCase",
      text: playlistName,
    })}Dispatch`]: genericDispatch,
  } = usePlaylists();

  const removeVideo = (video) => {
    genericDispatch({
      type: REMOVE_FROM_GENERIC_ARRAY,
      arrayName: playlistName,
      video,
    });
  };

  return (
    <div className="container">
      <h1>{transformText({ type: "titleCase", text: playlistName })}</h1>
      <div className="flex">
        {genericArray.map((video) => {
          return (
            <GenericListingCard
              key={video.id}
              video={video}
              removeVideo={removeVideo}
            />
          );
        })}
      </div>
    </div>
  );
}

function GenericListingCard({ video, removeVideo }) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  return (
    <BaseCard {...video}>
      <CloseButton onClick={() => removeVideo(video)} />
      <div className="pl-4 pb-1">
        <SaveModalButton setShowSaveModal={setShowSaveModal} />
      </div>
      <PlaylistModal
        showSaveModal={showSaveModal}
        setShowSaveModal={setShowSaveModal}
        video={video}
      />
    </BaseCard>
  );
}
