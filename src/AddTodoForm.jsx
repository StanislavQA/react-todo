import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

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
        label="Title"
        type="text"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
