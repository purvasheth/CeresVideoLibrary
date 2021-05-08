import { useNavigate, useParams } from "react-router";
import { Iframe } from "../../components/Iframe";
import { ToggleIconGroup } from "../../components/ToggleIconGroup";
import { Avatar } from "../../components/BaseCard";
import { SaveModalButton, PlaylistModal } from "../../components/PlaylistModal";
import { useEffect, useState } from "react";
import { usePlaylists } from "../Playlists/playlists-context";
import {
  ADD_TO_HISTORY,
  SET_HISTORY,
  UPDATE_TIMESTAMP,
} from "../History/history-reducer";
import { Notes } from "./Notes";
import { useAxios } from "../../custom hooks/useAxios";
import { API_HISTORY, API_VIDEOS } from "../../urls";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { getDefaultPlaylistArray } from "../../utils";
import { useHistory } from "../History/history-context";

export function VideoDetail() {
  const { videoId } = useParams();
  const { likedVideosId, watchLaterId, playlists } = usePlaylists();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [video, setVideo] = useState({});
  const { isLoading, getData: getVideo } = useAxios(`${API_VIDEOS}/${videoId}`);
  const { postData: addToHistory, getData: getHistory } = useAxios(API_HISTORY);
  const likedVideos = getDefaultPlaylistArray(playlists, likedVideosId);
  const watchLater = getDefaultPlaylistArray(playlists, watchLaterId);
  const { history, historyDispatch } = useHistory();
  const navigate = useNavigate();
  const {
    _id: mongooseVideoId,
    id,
    avatarSrc,
    uploadedBy,
    finalNotes,
    name,
  } = video;

  const updateHistory = (payload) => {
    historyDispatch({
      type: UPDATE_TIMESTAMP,
      ...payload,
    });
  };

  const addVideoToHistory = (payload) => {
    historyDispatch({
      type: ADD_TO_HISTORY,
      historyVideo: {
        id,
        avatarSrc,
        name,
        uploadedBy,
        ...payload,
      },
    });
  };

  const addVideOrUpdateHistory = async () => {
    const { timestamp, _id, updated } = await addToHistory({
      id: video._id,
    });
    if (updated) {
      updateHistory({ timestamp, videoId: _id });
    } else {
      addVideoToHistory({ timestamp, _id });
    }
  };

  const fetchHistory = async () => {
    if (history.length === 0) {
      const fetchedVideos = await getHistory();
      historyDispatch({ type: SET_HISTORY, fetchedVideos });
    }
  };

  useEffect(() => {
    (async () => {
      const fetchedVideo = await getVideo();
      if (fetchedVideo) {
        setVideo(fetchedVideo);
      } else {
        navigate("/page-not-found");
      }
    })();
    return () => {
      setVideo({});
    };
  }, []);

  useEffect(() => {
    if (mongooseVideoId) {
      fetchHistory();
      addVideOrUpdateHistory();
    }
  }, [video]);

  return (
    <div className="container flex width-full">
      <div className="container--video">
        <LoadingIndicator isLoading={isLoading}>
          <h2 className="video__title">{name}</h2>
          <Iframe id={id} />
          <div>
            <div className="flex video__info">
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
