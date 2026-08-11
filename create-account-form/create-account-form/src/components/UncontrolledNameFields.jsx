import { useRef } from "react";
function UncontrolledNameFields() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    console.log({
      firstName,
      lastName,
    });
  }
  return (
    <section className="uncontrolled-section">
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="uncontrolled-first-name">First Name</label>
          <input
            id="uncontrolled-first-name"
            type="text"
            ref={firstNameRef}
            defaultValue=""
            placeholder="Enter first name" />
        </div>
        <div className="form-group">
          <label htmlFor="uncontrolled-last-name">Last Name</label>
          <input
            id="uncontrolled-last-name"
            type="text"
            ref={lastNameRef}
            defaultValue=""
            placeholder="Enter last name"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
export default UncontrolledNameFields;
