export function Modal({ children, showModal, onCloseClick }) {
  return (
    <div className={`modal-bg ${showModal ? "" : "modal-hide"}`}>
      <div className={`modal ${showModal ? "" : "modal-hide"}`}>
        <div className={`modal-content ${showModal ? "" : "modal-hide"}`}>
          <button onClick={onCloseClick} className="btn-close btn-lg">
            <i className="fas fa-times"></i>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
