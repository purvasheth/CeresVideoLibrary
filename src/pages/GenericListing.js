import { useState } from "react";
import { usePlaylists } from "./playlists-context";
import { BaseCard } from "../components/BaseCard";
import { PlaylistModal, SaveModalButton } from "../components/PlaylistModal";

// shamelessly copied from
// https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-sentence-case-text
const camel2title = (camelCase) =>
  camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

//  TODO: add delete using close button
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
          return <GenericListingCard key={id} id={id} {...rest} />;
        })}
      </div>
    </div>
  );
}

function GenericListingCard(video) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  return (
    <BaseCard {...video}>
      <div className="pl-5 pb-1">
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
