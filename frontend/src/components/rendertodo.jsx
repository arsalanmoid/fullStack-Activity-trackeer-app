import React from "react";
import axios from "axios";

export default function TodoList({ todos, setTodos }) {
  const handleMarkAsDone = async (todoId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/todo/update",
        { todoId, completed: true },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // Update the state to reflect the change
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todoId === todoId ? { ...todo, completed: true } : todo
        )
      );
    } catch (e) {
      alert("Error marking todo as done");
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/todo/delete",
        { todoId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.todoId !== todoId)
      );
    } catch (e) {
      alert("Error deleting todo");
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Todos</h2>
        {Array.isArray(todos) && todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos found</p>
        ) : (
          <div className="space-y-4">
            {todos &&
              todos.map((todo) => (
                <div
                  key={todo.todoId}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-md"
                >
                  <div className="flex flex-col flex-grow">
                    <span className="font-semibold text-lg">{todo.title}</span>
                    <span className="text-gray-600">{todo.description}</span>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleMarkAsDone(todo.todoId)}
                      disabled={todo.completed}
                      className={`px-4 py-2 rounded-md text-white font-semibold ${
                        todo.completed ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Mark as Done"}
                    </button>
                    <button
                      onClick={() => handleDelete(todo.todoId)}
                      className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
