import { useState } from "react";

function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!message.trim()) {
      newErrors.message = "Please enter your feedback.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("Please correct the errors before submitting.");
      return;
    }

    setErrors({});
    setStatus("Feedback submitted successfully.");

    setName("");
    setEmail("");
    setMessage("");
    setSubscribe(false);
  }

  return (
    <section
      className="feedback-section"
      aria-labelledby="feedback-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Practice</p>

          <h2 id="feedback-title">
            Accessible feedback form
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">
              Name <span aria-hidden="true">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);

                if (errors.name) {
                  setErrors((current) => ({
                    ...current,
                    name: "",
                  }));
                }
              }}
              placeholder="Enter your name"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />

            {errors.name && (
              <p id="name-error" className="field-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">
              Email address <span aria-hidden="true">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);

                if (errors.email) {
                  setErrors((current) => ({
                    ...current,
                    email: "",
                  }));
                }
              }}
              placeholder="you@example.com"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
            />

            {errors.email && (
              <p id="email-error" className="field-error">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="message">
            Message <span aria-hidden="true">*</span>
          </label>

          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);

              if (errors.message) {
                setErrors((current) => ({
                  ...current,
                  message: "",
                }));
              }
            }}
            placeholder="Write your feedback..."
            rows="4"
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "message-error" : undefined
            }
          />

          {errors.message && (
            <p id="message-error" className="field-error">
              {errors.message}
            </p>
          )}
        </div>

        <div className="checkbox-field">
          <input
            id="subscribe"
            name="subscribe"
            type="checkbox"
            checked={subscribe}
            onChange={(event) =>
              setSubscribe(event.target.checked)
            }
          />

          <label htmlFor="subscribe">
            Send me accessibility tips
          </label>
        </div>

        <button type="submit" className="primary-button">
          Submit feedback
        </button>

        <p
          id="form-status"
          className="status-message"
          aria-live="polite"
          role="status"
        >
          {status}
        </p>
      </form>
    </section>
  );
}

export default FeedbackForm;