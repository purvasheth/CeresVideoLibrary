import { BaseCard } from "../components/BaseCard";
import { CloseButton } from "../components/CloseButton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlaylists } from "./playlists-context";
import { LoadingIndicator } from "../components/LoadingIndicator";

export function PlaylistDetail() {
  const { playlistId } = useParams();
  const { playlists } = usePlaylists();
  const { name, videos } = playlists.find(
    (playlist) => playlist._id === playlistId
  ) || {
    name: "Playlist does not exsist",
    videos: [],
  };
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (playlists.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [playlists]);
  return (
    <div className="container">
      <LoadingIndicator isLoading={isLoading}>
        <h1>{name}</h1>
        <div className="flex">
          {videos.map((video) => {
            return (
              <BaseCard key={video._id} {...video}>
                <CloseButton video={video} playlistId={playlistId} />
              </BaseCard>
            );
          })}
        </div>
      </LoadingIndicator>
    </div>
  );
}
