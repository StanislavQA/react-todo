import React from "react";
import ToDoListItem from "./ToDoListItem";
import PropTypes from "prop-types";
import "./TodoListItem.module.css";

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <div>
      <ul>
        {todoList.map((todoItem, index) => (
          // Pass the todo item and onRemoveTodo function as props to ToDoListItem
          <ToDoListItem
            key={`${todoItem.id}-${index}`}
            todo={todoItem}
            onRemoveTodo={onRemoveTodo} // Pass onRemoveTodo as a prop
          />
        ))}
      </ul>
    </div>
  );
};

// Define prop types
TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
