import { createPortal } from "react-dom";
function Modal({ children, onClose }) {
  const modalRoot = document.getElementById("modal-root");
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}> × </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
export default Modal;
