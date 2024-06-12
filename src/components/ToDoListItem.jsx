import React from "react";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";

const ToDoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <li className={styles.ListItem}>
      {todo.title}
      <button
        type="button"
        className="button-remove"
        onClick={() => onRemoveTodo(todo.id)}
      >
        Remove
      </button>
    </li>
  );
};

// Define prop types
ToDoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default ToDoListItem;
