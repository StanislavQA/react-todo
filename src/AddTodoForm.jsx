import React, { useState } from "react";

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
      <label htmlFor="todoTitle">Title</label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
