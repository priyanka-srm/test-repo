import { forwardRef } from "react";
import "./CustomInput.css";
const CustomInput = forwardRef(function CustomInput(props, ref) {
  return <input ref={ref} className="search-input" {...props} />;
});
export default CustomInput;
