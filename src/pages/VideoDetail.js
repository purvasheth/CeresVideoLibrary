import { useParams } from "react-router";
import { Iframe } from "../components/Iframe";
import { ToggleIconGroup } from "./VideoListing";
import { Avatar } from "../components/BaseCard";
import { SaveModalButton, PlaylistModal } from "../components/PlaylistModal";
import { useEffect, useState } from "react";
import { usePlaylists } from "./playlists-context";
import { ADD_TO_HISTORY_ARRAY } from "./generic-reducer";
import { Notes } from "./Notes";
import { useAxios } from "../useAxios";
import { API_VIDEOS } from "../urls";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { getDefaultPlaylistArray } from "../utils";

export function VideoDetail() {
  const { videoId } = useParams();
  const { likedVideosId, watchLaterId, playlists } = usePlaylists();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [video, setVideo] = useState({});
  const { isLoading, getData: getVideo } = useAxios(`${API_VIDEOS}/${videoId}`);
  const likedVideos = getDefaultPlaylistArray(playlists, likedVideosId);
  const watchLater = getDefaultPlaylistArray(playlists, watchLaterId);
  const { historyDispatch } = usePlaylists();

  useEffect(() => {
    (async () => {
      const fetchedVideo = await getVideo();
      console.log(fetchedVideo);
      if (fetchedVideo) {
        setVideo(fetchedVideo);
      }
    })();

    // historyDispatch({
    //   type: ADD_TO_HISTORY_ARRAY,
    //   arrayName: "history",
    //   video,
    //   timestamp: new Date(),
    // });
    return () => {
      setVideo({});
    };
  }, []);

  const { id, avatarSrc, uploadedBy, finalNotes, name } = video;

  return (
    <div className="container flex width-full">
      <div className="container--video">
        <LoadingIndicator isLoading={isLoading}>
          <h2 className="video__title">{name}</h2>
          <Iframe id={id} />
          <div>
            <div className="flex">
              <div className="video__info">
                <div className="flex align-center justify-center flex-grow pt-sm">
                  <ToggleIconGroup
                    video={video}
                    likedVideos={likedVideos}
                    watchLater={watchLater}
                  />
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
          <Notes
            videoId={videoId}
            finalNotes={finalNotes}
            setVideo={setVideo}
          />
        </LoadingIndicator>
      </div>
    </div>
  );
}
