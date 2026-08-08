import { useState } from "react";
function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen((current) => !current);
  }
  return (
    <div className="accordion-item">
      <button
        type="button"
        className="accordion-header"
        onClick={handleToggle} >
        <span>{question}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
export default AccordionItem;