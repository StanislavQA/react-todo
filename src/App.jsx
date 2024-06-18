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
  const [sortOrder, setSortOrder] = useState("asc"); // State for sort order

  // Fetch data from Airtable API
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
        createdTime: record.createdTime, // Assuming createdTime is available
      }));

      // Sort todos based on the current sortOrder
      const sortedTodos = sortTodos(todos, sortOrder);
      setTodoList(sortedTodos);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch data error:", error.message);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder]); // Re-fetch data when sortOrder changes

  // Load data from localStorage or fetch from server
  useEffect(() => {
    const localTodos = localStorage.getItem("todoList");
    if (localTodos) {
      const parsedTodos = JSON.parse(localTodos);
      const sortedTodos = sortTodos(parsedTodos, sortOrder);
      setTodoList(sortedTodos);
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, []);

  // Save todoList to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // Toggle the sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Add a new todo and sort the updated list
  const addTodo = async (todo) => {
    const airtableData = {
      fields: { title: todo.title },
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
        throw new Error(`Error has ocurred:${response.status}`);
      }

      const dataResponse = await response.json();
      const newTodo = {
        id: dataResponse.id,
        title: dataResponse.fields.title,
        createdTime: dataResponse.createdTime, // Assuming createdTime is returned
      };

      // Update and sort the todoList with the new todo
      const updatedTodoList = sortTodos([...todoList, newTodo], sortOrder);
      setTodoList(updatedTodoList);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Remove a todo by id and update the state
  const removeTodo = async (id) => {
    // Optimistically update the todoList state
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);

    // Send DELETE request to Airtable
    try {
      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_TABLE_NAME}/${id}`;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to delete todo with id ${id}`);
      }
    } catch (error) {
      console.error(error.message);
      // Revert optimistic update if delete fails
      setTodoList((prevTodoList) => [...prevTodoList, ...updatedTodoList]);
    }
  };

  // Helper function to sort todos based on the given order
  const sortTodos = (todos, order) => {
    return todos.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (order === "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <h1>Todo List</h1>
        <button onClick={toggleSortOrder}>
          Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
        <AddTodoForm onAddTodo={addTodo} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              }
            />
            <Route path="/new" element={<h1>New Todo List</h1>} />
          </Routes>
        )}
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
