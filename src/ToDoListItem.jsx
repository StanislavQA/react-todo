import React from "react";

const ToDoListItem = (props) => {
  return (
    <div>
      <li>{props.todo.title}</li>
    </div>
  );
};

export default ToDoListItem;
