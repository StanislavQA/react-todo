import React, { useRef, useEffect } from "react";

const InputWithLabel = ({ id, type, name, value, onChange, children }) => {
  // Create an imperative ref using the useRef hook
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
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

export default InputWithLabel;
