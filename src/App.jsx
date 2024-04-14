import React from "react";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

// Custom hook to manage semi-persistent state
function useSemiPersistentState() {
  // Read from localStorage or default to an empty array
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {
  // Initialize todoList state using custom hook
  const [todoList, setTodoList] = useSemiPersistentState();

  // Function to add a new todo to the todoList state
  const addTodo = (newTodo) => {
    // Update the todoList state and localStorage
    setTodoList([...todoList, newTodo]);
  };

  // Function to remove a todo item from the todoList state
  const removeTodo = (id) => {
    // Filter out the todo item with the given id
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  // useEffect hook with todoList as a dependency

  return (
    <React.Fragment>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </React.Fragment>
  );
}

export default App;
