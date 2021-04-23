import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useVideos } from "./videos-context";
import { UPDATE_NOTES } from "./videos-reducer";

export function Notes({ id, finalNotes }) {
  const [isEditable, setIsEditable] = useState(false);
  const [notes, setNotes] = useState(finalNotes);
  const { videosDispatch } = useVideos();

  const onSaveClick = () => {
    videosDispatch({ type: UPDATE_NOTES, videoId: id, finalNotes: notes });
    setIsEditable(false);
  };
  const onCancelClick = () => {
    setNotes(finalNotes);
    setIsEditable(false);
  };
  return (
    <div className="video__notes p-1">
      <h2 className="flex justify-between align-center">
        Add Notes using markdown
        {isEditable ? (
          <div className="">
            <button
              className="btn btn--icon btn--success playlist__icon"
              onClick={onSaveClick}
            >
              <i class="fas fa-check" />
            </button>
            <button
              className="btn btn--icon btn--warning playlist__icon"
              onClick={onCancelClick}
            >
              <i class="fas fa-times" />
            </button>
          </div>
        ) : (
          <button
            className="btn btn--icon font--primary playlist__icon"
            onClick={() => setIsEditable(true)}
          >
            <i class="fas fa-pen" />
          </button>
        )}
      </h2>
      {isEditable ? (
        <textarea
          className="ta--notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      ) : (
        <div className="react-markdown">
          <ReactMarkdown>{finalNotes}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
