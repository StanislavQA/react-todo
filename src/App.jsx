import React, { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  // Initialize todoList state using custom hook
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Side-effect with an empty dependency list
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const storedData = localStorage.getItem("todoList");
          const parsedData = storedData ? JSON.parse(storedData) : []; //Added by myself, not sure if it should look like this
          resolve({ data: { todoList: parsedData } }); // Pass todoList as initial/default list state
        }, 2000);
      });
    };

    fetchData().then((result) => {
      setTodoList(result.data.todoList); // Update todoList with the todoList from the result object
      setIsLoading(false); // Set isLoading to false after data fetch
    });
  }, []);

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

  React.useEffect(() => {
    //Side-effect to save todoList to localStorage
    if (!isLoading) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // useEffect hook with todoList as a dependency

  return (
    <React.Fragment>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </React.Fragment>
  );
}

export default App;
