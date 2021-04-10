import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useVideos } from "./videos-context";
import { UPDATE_NOTES } from "./videos-reducer";

export function Notes({ id, finalNotes }) {
  const [isEditable, setIsEditable] = useState(false);
  const [notes, setNotes] = useState("");
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
      <h2 className="font--center">Notes (using markdown)</h2>
      {isEditable ? (
        <div className="align-end">
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
          className="btn btn--icon font--primary playlist__icon align-end"
          onClick={() => setIsEditable(true)}
        >
          <i class="fas fa-pen" />
        </button>
      )}

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
