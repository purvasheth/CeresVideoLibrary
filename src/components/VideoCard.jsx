import { useState } from "react";
import { BaseCard } from "./BaseCard";
import { SaveModalButton, PlaylistModal } from "./PlaylistModal";
import { ToggleIconGroup } from "./ToggleIconGroup";

export function VideoCard({ video, watchLater, likedVideos }) {
  const [showSaveModal, setShowSaveModal] = useState(false);

  return (
    <BaseCard {...video}>
      <VideoCardFooter>
        <ToggleIconGroup
          video={video}
          watchLater={watchLater}
          likedVideos={likedVideos}
        />
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
