import { useState } from "react";
function Toggle({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen((current) => !current);
  }
  return children(isOpen, handleToggle);
}
export default Toggle;
