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
    const fetchData = async () => {
      try {
        // Create URL using enviroment variables
        const url = `https://api.airtable.com/v0/${
          import.meta.env.VITE_AIRTABLE_BASE_ID
        }/${import.meta.env.VITE_TABLE_NAME}`;
        console.log(url);
        // Declare an empty object variable named options
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Airtable API response:", data); //Print out the data variable
        return { data };
      } catch (error) {
        // Handle error e.g., show an error message to the user
        console.error("Error fetching data:", error);
        throw error;
      }
    };

    fetchData()
      .then((result) => {
        setTodoList(result.data.todoList); // Update todoList with the todoList from the result object
        setIsLoading(false); // Set isLoading to false after data fetch
      })
      .catch((error) => {
        //Handle error, e.g., set isLoading to false to stop loading state
        setIsLoading(false);
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
