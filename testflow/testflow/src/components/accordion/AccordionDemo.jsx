import Accordion from "./Accordion";

function AccordionDemo() {
  return (
    <section>
      <h2>Compound Components Demo</h2>

      <Accordion>
        <Accordion.Item value="react">
          <Accordion.Header>What is React?</Accordion.Header>
          <Accordion.Panel>
            React is a JavaScript library for building user interfaces.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="context">
          <Accordion.Header>What is Context?</Accordion.Header>
          <Accordion.Panel>
            Context lets components share values without passing props through
            every intermediate component.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="compound">
          <Accordion.Header>What are Compound Components?</Accordion.Header>
          <Accordion.Panel>
            Compound components work together through a shared parent state and
            context.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </section>
  );
}

export default AccordionDemo;
