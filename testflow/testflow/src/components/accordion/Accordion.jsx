import { createContext, useContext, useState } from "react";

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

function useAccordion() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("Accordion components must be used inside Accordion.");
  }

  return context;
}

function Accordion({ children }) {
  const [openItem, setOpenItem] = useState(null);

  function toggleItem(value) {
    setOpenItem((current) => (current === value ? null : value));
  }

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div>{children}</div>
    </AccordionContext.Provider>
  );
}

function Item({ value, children }) {
  const { openItem, toggleItem } = useAccordion();
  const isOpen = openItem === value;

  return (
    <AccordionItemContext.Provider
      value={{
        value,
        isOpen,
        toggle: () => toggleItem(value),
      }}
    >
      <div data-testid={`accordion-item-${value}`}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

function Header({ children }) {
  const { value, isOpen, toggle } = useContext(AccordionItemContext);

  if (value === undefined) {
    throw new Error("Accordion.Header must be inside Accordion.Item.");
  }

  return (
    <h3>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`panel-${value}`}
        onClick={toggle}
      >
        {children}
      </button>
    </h3>
  );
}

function Panel({ children }) {
  const { value, isOpen } = useContext(AccordionItemContext);

  if (value === undefined) {
    throw new Error("Accordion.Panel must be inside Accordion.Item.");
  }

  return (
    <div id={`panel-${value}`} hidden={!isOpen}>
      {children}
    </div>
  );
}

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Panel = Panel;

export default Accordion;
