import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]); // Create new state varibale for todo list

  // Function to add a new todo to the todoList state
  const addTodo = (newTodo) => {
    // Update the todoList state by spreading the existing todos and adding the new todo
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} /> {/* Pass todoList state as a prop */}
    </>
  );
}

export default App;
