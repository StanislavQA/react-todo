import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function (todo) {
          return <li key={todo.id}>{todo.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
