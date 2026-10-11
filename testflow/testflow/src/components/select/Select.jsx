import { useState } from "react";

function Select({
  options = [],
  value,
  defaultValue = "",
  onChange,
  name,
  id,
  label = "Choose an option",
  disabled = false,
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  function handleChange(event) {
    const nextValue = event.target.value;

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  }

  return (
    <label>
      {label}
      <select
        id={id}
        name={name}
        value={selectedValue}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
