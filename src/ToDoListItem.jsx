import React from "react";

const ToDoListItem = ({ todo }) => {
  return (
    <div>
      <li>{todo.title}</li>
    </div>
  );
};

export default ToDoListItem;
