import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

        // Map data.records into array of todo objects
        const todos = data.records.map((record) => ({
          id: record.id,
          title: record.fields.title,
        }));

        return todos;
      } catch (error) {
        throw error;
      }
    };

    fetchData()
      .then((todos) => {
        setTodoList(todos); // Set todoList using todos
        setIsLoading(false); // Setting isLoading to false after the fetch completes
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message); // Logging the error message
        setIsLoading(false); // Also setting isLoading to false in case of an error
      });
  }, []);

  // Update the todoList state and send POST request to API
  const addTodoToApi = async (title) => {
    try {
      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_TABLE_NAME}`;

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: { title } }),
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding todo:", error.message);
      throw error;
    }
  };

  const addTodo = (newTodoTitle) => {
    // Add todo to API and update todoList state with the response
    addTodoToApi(newTodoTitle)
      .then((resp) => {
        setTodoList([...todoList, { id: resp.id, title: resp.fields.title }]);
      })
      .catch((error) => {
        // Handle error e.g., show an error message to the user
        console.error("Error adding todo:", error.message);
      });
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
    <BrowserRouter>
      <React.Fragment>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )
            }
          />

          <Route path="/new" element={<h1>New Todo List</h1>} />
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
