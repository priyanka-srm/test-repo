import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function AccessibleModal({ isOpen, onClose, onConfirm }) {
  const headingRef = useRef(null);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousActiveElement.current = document.activeElement;

    requestAnimationFrame(() => {
      headingRef.current?.focus();
    });

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const modal = modalRef.current;

      if (!modal) {
        return;
      }

      const focusableElements = modal.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );

      const focusable = Array.from(focusableElements);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen && previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <header className="modal-header">
          <div>
            <p className="modal-eyebrow">Confirmation</p>

            <h2
              id="modal-title"
              ref={headingRef}
              tabIndex={-1}
            >
              Confirm your action
            </h2>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="modal-body">
          <p id="modal-description">
            Are you sure you want to continue? This action will be recorded
            as completed.
          </p>
        </div>

        <footer className="modal-footer">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={onConfirm}
          >
            Continue
          </button>
        </footer>
      </section>
    </div>,
    document.body
  );
}

export default AccessibleModal;