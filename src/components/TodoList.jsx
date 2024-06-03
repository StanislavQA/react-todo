import React from "react";
import ToDoListItem from "./ToDoListItem";
import "./TodoListItem.module.css";

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <div>
      <ul>
        {todoList.map((todoItem) => (
          // Pass the todo item and onRemoveTodo function as props to ToDoListItem
          <ToDoListItem
            key={todoItem.id}
            todo={todoItem}
            onRemoveTodo={onRemoveTodo} // Pass onRemoveTodo as a prop
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
