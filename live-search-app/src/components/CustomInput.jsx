import { forwardRef } from "react";
import "./CustomInput.css";
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} className="search-input" {...props} />;
});
export default CustomInput;
