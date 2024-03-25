import React from "react";
import ToDoListItem from "./ToDoListItem";

const TodoList = ({ todoList }) => {
  return (
    <div>
      <ul>
        {todoList.map((todoItem) => (
          <ToDoListItem key={todoItem.id} todo={todoItem} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
