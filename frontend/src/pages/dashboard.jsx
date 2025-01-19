import React, { useEffect, useState } from "react";
import PutTodo from "../components/puttodo"
import RenderTodo from '../components/rendertodo'
import axios from "axios";
export default function Dashboard(){
    const [todos,setTodos]=useState([]);
    async function addTodo(title,description)
    {
        try {
              const response = await axios.post(
                "http://localhost:3000/api/v1/todo/addtodo",
                {
                  title,
                  description,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              const msg = response.data.msg;
              if (msg === "Todo added successfully!") {
                alert("Todo added successfully!");
              }
              setTodos(response.data.todos);
            } catch (e) {
              alert(e.response?.data?.msg || "Something went wrong.");
            }
    }
    async function fetchTodos() {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/todo/fetch",
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (response.data.success) {
                setTodos(response.data.todos); // Populate the state with fetched todos
            } else {
                console.log(response.data.message);
            }
        } catch (e) {
            
        }
    }
    
  
    useEffect(()=>{
        async function loadData()
        {
            await fetchTodos();
            
        }
        loadData();
    },[todos])
    return(
        <div>
            <PutTodo addTodo={addTodo}/>
            <RenderTodo todos={todos} setTodos={setTodos}/>
        </div>
    )
}