import { useEffect, useRef } from "react";

function useFocusReturn(isOpen) {
  const triggerRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isOpen]);

  return triggerRef;
}

export default useFocusReturn;