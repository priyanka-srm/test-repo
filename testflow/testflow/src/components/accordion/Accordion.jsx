import { createContext, useContext, useId, useState } from "react";

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

function useAccordion() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("Accordion components must be used inside Accordion.");
  }

  return context;
}

function useAccordionItem(componentName) {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(`${componentName} must be used inside Accordion.Item.`);
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
  const generatedId = useId();
  const isOpen = openItem === value;
  const panelId = `panel-${generatedId}`;

  return (
    <AccordionItemContext.Provider
      value={{
        value,
        isOpen,
        toggle: () => toggleItem(value),
        panelId,
      }}
    >
      <div data-testid={`accordion-item-${value}`}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

function Header({ children }) {
  const { isOpen, toggle, panelId } = useAccordionItem("Accordion.Header");

  return (
    <h3>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
      >
        {children}
      </button>
    </h3>
  );
}

function Panel({ children }) {
  const { isOpen, panelId } = useAccordionItem("Accordion.Panel");

  return (
    <div id={panelId} hidden={!isOpen}>
      {children}
    </div>
  );
}

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Panel = Panel;

export default Accordion;
