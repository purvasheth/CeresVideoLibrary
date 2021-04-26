export function EditIcons({ onSave, onCancel }) {
  return (
    <div>
      <button
        className="btn btn--icon btn--success playlist__icon"
        onClick={onSave}
      >
        <i className="fas fa-check"></i>
      </button>
      <button
        className="btn btn--icon btn--warning playlist__icon"
        onClick={onCancel}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}
