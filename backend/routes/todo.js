const express = require("express");
const {Todo} = require("../db");
const { authMiddleware } = require("../middleware");
const router = express.Router();

router.post("/addtodo", authMiddleware, async (req, res) => {
    const userId = req.userId; // Ensure this is set
    if (!userId) {
        return res.status(400).json({ success: false, msg: "User ID is missing in the request." });
    }

    const body = req.body;

    try {
        let todoRecord = await Todo.findOne({ userId });
        if (todoRecord) {
            const lastTodo = todoRecord.todos[todoRecord.todos.length - 1];
            const newId = lastTodo ? lastTodo.todoId + 1 : 1;

            body.todoId = newId;
            todoRecord.todos.push(body);
            await todoRecord.save();

            return res.json({ success: true, msg: "Todo added successfully!" ,todos:todoRecord.todos});
        } else {
            const newId = 1;
            body.todoId = newId;

            todoRecord = new Todo({
                userId,
                todos: [body],
            });

            await todoRecord.save();

            return res.json({ success: true, msg: "Todo added successfully!" });
        }
    } catch (error) {
        console.error("Error adding/updating todo:", error);
        return res.status(500).json({ success: false, msg: "An error occurred while adding/updating the todo." });
    }
});


router.post("/update", authMiddleware, async (req, res) => {
    const { todoId, completed } = req.body; 
    const userId = req.userId; 

    try {
        
        const todoRecord = await Todo.findOne({ userId });

        if (!todoRecord) {
            return res.status(404).json({ message: "Todo record not found for this user" });
        }

        
        const todo = todoRecord.todos.find(todo => todo.todoId === todoId);

        if (!todo) {
            return res.status(404).json({ message: "Todo with the provided ID not found" });
        }

       todo.completed = completed;

        await todoRecord.save();

        return res.status(200).json({ success: true, message: "Todo marked as completed" });
    } catch (error) {
        console.error("Error updating todo:", error);
        return res.status(500).json({ message: "An error occurred while updating the todo." });
    }
});

router.post("/delete", authMiddleware, async (req, res) => {
    const { todoId } = req.body; 
    const userId = req.userId; 

    try {
        // Find the Todo document for the user
        const todoRecord = await Todo.findOne({ userId });

        if (!todoRecord) {
            return res.status(404).json({ message: "Todo record not found for this user" });
        }

        // Find the index of the todo with the provided id
        const todoIndex = todoRecord.todos.findIndex(todo => todo.todoId === todoId);

        if (todoIndex === -1) {
            return res.status(404).json({ message: "Todo with the provided ID not found" });
        }

        // Remove the todo from the array
        todoRecord.todos.splice(todoIndex, 1);

        // Save the updated todo record
        await todoRecord.save();

        return res.status(200).json({ success: true, message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return res.status(500).json({ message: "An error occurred while deleting the todo." });
    }
});

router.get("/fetch",authMiddleware,async(req,res)=>{
    const userId = req.userId;

    try {
        
        const todoRecord = await Todo.findOne({ userId });

        if (!todoRecord) {
            return res.json({success:false, message: "No todos found for this user" });
        }
        res.json({success:true,todos:todoRecord.todos});
    } 
    catch (error) {
       console.log(error);
       res.json({success:false,message:"ERROR"});
    }
})

module.exports = router
