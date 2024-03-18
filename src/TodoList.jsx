import React from "react";
import ToDoListItem from "./ToDoListItem";

var todoList = [
  {
    id: 1,
    title: "Complete assignment #1",
  },
  {
    id: 2,
    title: "Complete assignment #2",
  },
  {
    id: 3,
    title: "Complete assignment #3",
  },
];

const TodoList = () => {
  return (
    <div>
      <ul>
        {todoList.map(function (todoItem) {
          return <ToDoListItem key={todoItem.id} todo={todoItem} />;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
