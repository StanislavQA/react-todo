import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  // Initialize todoList state using custom hook
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update the todoList state and send POST request to API
  const addTodo = async (todo) => {
    const airtableData = {
      fields: {
        title: todo.title,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify(airtableData),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error has ocurred:${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      const newTodo = {
        id: dataResponse.id,
        title: dataResponse.fields.title,
      };

      setTodoList((prevTodolist) => [...prevTodolist, newTodo]);

      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
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
