import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { EditIcons } from "../../components/EditIcons";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { API_VIDEOS } from "../../urls";
import { useAxios } from "../../custom hooks/useAxios";

export function Notes({ videoId, finalNotes, setVideo }) {
  const [isEditable, setIsEditable] = useState(false);
  const { updateData: updateNotes, isLoading } = useAxios(API_VIDEOS);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!notes) {
      setNotes(finalNotes);
    }
  }, [finalNotes]);

  const onSaveClick = async () => {
    const { finalNotes: updatedNotes } = await updateNotes(videoId, {
      finalNotes: notes,
    });
    if (updateNotes) {
      setVideo((prev) => ({ ...prev, finalNotes: updatedNotes }));
    }

    setIsEditable(false);
  };
  const onCancelClick = () => {
    setNotes(finalNotes);
    setIsEditable(false);
  };
  return (
    <div className="video__notes p-1">
      <LoadingIndicator isLoading={isLoading}>
        <h2 className="flex justify-between align-center">
          Add Notes using markdown
          {isEditable ? (
            <EditIcons onCancel={onCancelClick} onSave={onSaveClick} />
          ) : (
            <button
              className="btn btn--icon font--primary playlist__icon"
              onClick={() => setIsEditable(true)}
            >
              <i className="fas fa-pen" />
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
      </LoadingIndicator>
    </div>
  );
}
