import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const InputWithLabel = ({ id, type, name, value, onChange, children }) => {
  // Create an imperative ref using the useRef hook
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <React.Fragment>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </React.Fragment>
  );
};

// Define prop types
InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputWithLabel;
