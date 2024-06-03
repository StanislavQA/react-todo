import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import "./AddTodoForm.css"; // Import the CSS file
import PropTypes from "prop-types";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState(""); // State for input value

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value; // Retrieve input value
    setTodoTitle(newTodoTitle); // Update input value in state
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle(""); // Reset todoTitle state to empty string
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        id="todoTitle"
        type="text"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      >
        Title
      </InputWithLabel>
      <button type="submit" className="button-add">
        Add
      </button>
    </form>
  );
};

// Define propTypes property below the function
AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
