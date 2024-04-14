import React, { useRef, useEffect } from "react";

const InputWithLabel = (props) => {
  // Create an imperative ref using the useRef hook
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        ref={inputRef}
      />
    </React.Fragment>
  );
};

export default InputWithLabel;
