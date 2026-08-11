import { useState } from "react";
function Toggle({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen((current) => !current);
  }
  // I prefer the render-props approach here because it makes the reusable
  // toggle behavior explicit, although a custom Hook would be simpler for
  // modern React applications.
  return children(isOpen, handleToggle);
}
export default Toggle;
