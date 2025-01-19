import React, { useState } from "react";
import axios from "axios";

export default function PutTodo({addTodo}) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  async function buttonHandler(e) {
    e.preventDefault(); // Prevent default form behavior
    addTodo(title,description);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg mb-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Todo</h2>
        <form className="space-y-4" onSubmit={buttonHandler}>
          <div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
