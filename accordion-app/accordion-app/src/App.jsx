import { useState } from "react";
import Accordion from "./components/Accordion";
import AccordionItem from "./components/AccordionItem";
import KeyPractice from "./components/KeyPractice";
import Modal from "./components/Modal";
import Notification from "./components/Notification";
import Toggle from "./components/Toggle";
import "./App.css";
function App() {
  const [showModal, setShowModal] = useState(false);
  const faqData = [
    {
      id: 1,
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      id: 2,
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension that lets us write HTML-like code inside JavaScript.",
    },
    {
      id: 3,
      question: "What is useState?",
      answer:
        "useState is a React Hook used to manage state inside a component.",
    },
    {
      id: 4,
      question: "What is useEffect?",
      answer:
        "useEffect is a React Hook used to perform side effects in a component.",
    },
    {
      id: 5,
      question: "What is a Component?",
      answer: "A component is a reusable piece of UI in a React application.",
    },
  ];
  return (
    <div className="app-container">
      <div className="app">
        <h1>React Phase 8 Practice</h1>
        {/* Accordion + Children Composition */}
        <section>
          <h2>Accordion</h2>
          <Accordion>
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer} />
            ))}
          </Accordion>
        </section>
        {/* Render Props */}
        <section>
          <h2>Render Props</h2>
          <Toggle>
            {(isOpen, handleToggle) => (
              <div className="toggle-demo">
                <button type="button" onClick={handleToggle}>
                  {isOpen ? "Hide Message" : "Show Message"}
                </button>
                {isOpen && (
                  <p>
                    This message is controlled using the render props pattern.
                  </p>
                )}
              </div>
            )}
          </Toggle>
        </section>
        {/* Conditional Rendering */}
        <section>
          <h2>Conditional Rendering</h2>
          <Notification
            message="This is a warning notification."
            type="warning" />
          <Notification
            message="Everything is working correctly!"
            type="success" />
          <Notification message="" type="success" />
        </section>
        {/* Stable Key Practice */}
        <section>
          <h2>Stable Key Practice</h2>
          <KeyPractice />
        </section>
        {/* Portal Modal */}
        <section>
          <h2>Portal Modal</h2>
          <div className="overflow-container">
            <p>
              This container has overflow hidden. The modal should still appear
              outside it.
            </p>
            <button type="button" onClick={() => setShowModal(true)}>
              Open Modal
            </button>
          </div>
        </section>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h2>Hello from Portal!</h2>
            <p>This modal is rendered into #modal-root using createPortal.</p>
            <button type="button" onClick={() => setShowModal(false)}>
              Close Modal
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
}
export default App;
